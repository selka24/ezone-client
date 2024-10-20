<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import type {BookingTime, Company, Service} from "~/interfaces/main-types";
import {bookingFormValidationSchema} from '~/validations'
import BookServiceSelect from "~/components/booking/BookServiceSelect.vue";
import InputText from "~/components/inputs/InputText.vue";
import moment from "moment";
import StaffAvatar from "~/components/admin/staff/StaffAvatar.vue";
import {format} from "date-fns";

const {$api} = useNuxtApp();
const {addTimeToDate} = useUtils();
const route = useRoute();

const companyId = route.params.business_url;

const {data: company} = await useAsyncData<Company>('bookCompany', () => $api(`/company/${companyId}`, {
    method: 'GET',
}))

const {data: services} = await useAsyncData<Service[]>('allServices', () => $api(`/services/company/${companyId}`, {
    method: "GET"
}))



// console.log(company, 'companyyyy')

const { handleSubmit, errors, values: reservationInfo } = useForm({
    validationSchema: toTypedSchema(bookingFormValidationSchema),
    initialValues: {
        company: company.value?._id
        //@ts-ignore
    },
    validateOnMount: true
})

const {value: date} = useField<Date>('date');
const {value: selectedTime} = useField<BookingTime | null>('selectedTime');
const {value: employee} = useField<string>('employee');
const step = ref(0);
const loading = ref(false);
const confirmedReservation = ref<any>(null);

const selEmployeeName = () => {
    if(reservationInfo.employee) {
        const found = company.value?.employees?.find(e => e._id === reservationInfo.employee);
        if(found){
            return `${found.name} ${found.lastname}`
        }
    }
    return '';
}

const reservationData = computed(() => {
    if(confirmedReservation.value){
        const {name, date, email} = confirmedReservation.value;
        return {
            Emri: name,
            Email: email,
            Orari: moment(date).format('LLLL'),
            Stafi: selEmployeeName()
        }
    }
    const {name, phone, email} = reservationInfo;
    return {
        Emri: name,
        "Nr. Telefonit": phone,
        Email: email,
        Orari: finalDateTime.value ? moment(finalDateTime.value).format('LLLL') : '',
        Stafi: selEmployeeName()
    }
})

const getAvailableBookings = async () => {
    if(!date.value){
        selectedTime.value = null;
        return [];
    }
    try {
        const data: any = await $apiService.post('bookings/available', {
            body: {
                service: reservationInfo.service,
                company: company.value?._id,
                date: date.value
            }
        })
        return data
    } catch (e) {
        return []
    }
}

const {data: availableBookings, status: statusTimes} = await useAsyncData<BookingTime[]>('avlblBook', getAvailableBookings, {
    immediate: false,
    watch: [date]
})

const handleNextStep = async () => {
    if(step.value < 5) {
        step.value++
    }
}
const handlePrevStep = async () => {
    if(step.value > 0) {
        step.value--
    }
}

const {$apiService} = useNuxtApp();

const stepInvalid = computed(() => {
    const stepErrors: {[key: number]: string[]} = {
        0: ['service'],
        1: ['date', 'selectedTime'],
        2: ['employee'],
        3: ['name', 'email', 'phone']
    }
    //@ts-ignore
    const currFields = stepErrors[step.value];
    const a = currFields?.find((fieldName: string) => {
        //@ts-ignore
        return !!errors.value[fieldName]
    });
    return !!a;
})

const availableStaff = computed(() => {
    if(selectedTime.value){
        return company.value?.employees?.filter((o) => selectedTime.value?.availableEmpl?.includes(o._id))
    }
    return []
})

const stepInformation = computed(() => {
    switch (step.value) {
        case 0:
            return {
                title: 'Please select a service',
                btnTitle: 'Next Step'
            };
        case 1:
            return {
                title: 'Please select a day and time',
                btnTitle: 'Next Step'
            };
        case 2:
            return {
                title: 'Select a staff member',
                btnTitle: 'Next Step'
            }
        case 3:
            return {
                title: 'Please add your information',
                btnTitle: 'Next Step'
            }
        case 4:
            return {
                title: 'Reservation info',
                btnTitle: 'Reserve'
            }
        case 5:
            return {
                title: 'Successful Reservation',
                btnTitle: 'Change My Reservation'
            }
        default:
            return {
                title: 'Title',
                btnTitle: 'Button title'
            }
    }
})

const finalDateTime = computed(() => {
    const {selectedTime, date} = reservationInfo;
    if(selectedTime?.start_time && date){
        console.log(selectedTime?.start_time, date, 'aaaassadsdvasdfg')
        return addTimeToDate( moment(date).format('YYYY-MM-DD HH:mm'), selectedTime.start_time)
    }
    return null

})

const handleReserve = handleSubmit((bookingInfo) => {
    //@ts-ignore
    const {selectedTime: {start_time}, ...rest} = bookingInfo
    console.log('start_time:::', start_time);
    let final = {...rest, date: moment(finalDateTime.value).format("yyyy-MM-DD HH:mm")}
    console.log('final:::', final);
    makeReservation(final)
})

const makeReservation = async (body: any) => {
    try {
        loading.value = true;
        const data = await $api('/reserve', {
            method: 'POST',
            body
        })
        confirmedReservation.value = data
        step.value++;
    } catch (e) {
        //
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex justify-center items-center p-10">
        <div class="max-w-screen-sm w-full">
            <div class="card bg-base-100 shadow-xl">
                <form class="card-body"
                      @submit.prevent="handleReserve"
                      novalidate>
                    <div class="card-title justify-center mb-5">
                        <button v-if="step !== 5" class="btn btn-primary mr-auto" @click="handlePrevStep" :disabled="step < 1">
                            <fai icon="chevron-left"></fai>
                        </button>
                        <h2 class="font-bold text-3xl mr-auto">
                            {{company?.name}} - {{step}}
                        </h2>
                        <button v-if="step !== 5" class="btn btn-primary" @click="handleNextStep" :disabled="stepInvalid">
                            <fai icon="chevron-right"></fai>
                        </button>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg">{{stepInformation.title}}</h4>
                        <div class="divider divider-neutral my-5 w-full"></div>
                    </div>
                    <BookServiceSelect v-if="services" v-show="step === 0" name="service" :services="services"/>
                    <div v-show="step === 1" class="grid grid-cols-9 justify-center">
                        <div class="col-span-6">
                            <DatePicker v-model="date"
                                        class="p-0 m-0"
                                        :min-date="new Date()"
                                        :expanded="true"
                                        :transparent="true"
                                        :borderless="true"
                                        :is-dark="true"/>
                        </div>
                        <div class="col-span-1 w-full flex justify-center">
                            <div class="divider divider-horizontal divider-neutral m-0 h-full"></div>
                        </div>
                        <div class="col-span-2">
                            <div class="input input-bordered flex items-center justify-center mb-4">
                                {{ selectedTime?.start_time ? moment(selectedTime.start_time).format('HH : mm') : '00 : 00' }}
                            </div>
                            <div class="overflow-auto h-[240px] h-100 no-scrollbar w-full relative">
                                <span v-if="statusTimes === 'pending'" class="loading loading-spinner loading-md absolute-center"></span>
                                <div v-else-if="availableBookings" class="flex flex-col gap-3">
                                    <label
                                        v-for="b in availableBookings"
                                        :for="b.start_time"
                                        :class="['badge badge-xl w-full uppercase cursor-pointer', (selectedTime?.start_time !== b.start_time ? 'badge-outline': 'badge-primary')]"
                                    >
                                        <input type="radio"
                                               hidden
                                               name="timeRadio"
                                               :id="b.start_time"
                                               v-model="selectedTime"
                                               :value="b">
                                        <span class="py-1">
                                        {{ moment(b.start_time).format('HH:mm') }}
                                    </span>
                                    </label>
                                </div>
                                <div class="bg-base-100 pointer-events-none sticky bottom-0 flex h-24 cursor-default [mask-image:linear-gradient(transparent,#000000)]"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="step === 2" class="flex gap-3 flex-wrap">
                        <staff-avatar
                            :class="{'border border-primary rounded-lg': employee === empl._id}"
                            v-for="empl in availableStaff"
                            @click="() => employee = empl._id"
                            :key="empl._id"
                            :staff="empl"
                        />
                    </div>
                    <div v-show="step === 3">
                        <InputText name="name"/>
                        <InputText name="email"/>
                        <InputText name="phone"/>
                    </div>
                    <div v-if="step === 4">
                        <div class="font-bold mb-10">Check your information before reserving</div>
                        <div class="flex flex-col gap-5">
                            <div v-for="(info, key) in reservationData">
                                {{key}}: <b>{{info}}</b>
                            </div>
                        </div>
                    </div>
                    <div v-if="step === 5" class="flex flex-col gap-3">
                        <div class="font-bold text-success">
                            Rezervimi juaj u krye me sukses
                        </div>
                        <hr>
                        <div class="flex flex-col gap-5">
                            <div v-for="(info, key) in reservationData">
                                {{key}}: <b>{{info}}</b>
                            </div>
                        </div>
                    </div>
                    <button
                        v-if="step < 4"
                        type="button"
                        :disabled="stepInvalid"
                        @click="handleNextStep"
                        class="btn btn-primary mt-5"
                    >
                        {{stepInformation.btnTitle}}
                    </button>
                    <button
                        v-else-if="step !== 5"
                        type="submit"
                        class="btn btn-primary mt-5"
                    >
                        <span v-if="loading" class="loading loading-bars loading-md"></span>
                        <template v-else>
                            {{stepInformation.btnTitle}}
                        </template>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
