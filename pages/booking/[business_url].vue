<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
// import BookTimePicket from "~/components/booking/BookTimePicket.vue";
import type {BookingTime, Company, Service} from "~/interfaces/main-types";
import {bookingFormValidationSchema} from '~/validations'
import BookServiceSelect from "~/components/booking/BookServiceSelect.vue";
import InputText from "~/components/inputs/InputText.vue";
import {getUnixTime} from "date-fns";
import moment from "moment";
import StaffAvatar from "~/components/admin/staff/StaffAvatar.vue";

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
const confirmedReservation = ref<any>(null)

const getAvailableBookings = async () => {
    console.log({
        service: reservationInfo.service,
        company: company.value?._id,
        date
    })
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
        console.log(data, 'dataaaaaa')
        return data
    } catch (e) {
        console.log(e, 'dataaaaaa')
        return []
    }
}

const {data: availableBookings, status: statusTimes} = await useAsyncData<BookingTime[]>('avlblBook', getAvailableBookings, {
    immediate: false,
    watch: [date]
})

const handleNextStep = async () => {
    if(step.value < 4) {
        step.value++
    }
}

const {$apiService} = useNuxtApp();

// const dateTime = computed(() => {
//     if(reservationInfo.date && reservationInfo.time){
//         const date = moment(reservationInfo.date);
//         const [hour, minute] = reservationInfo.time;
//         date.hour(hour).minute(minute);
//         return date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//     }
//     return null;
// })
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
        console.log(errors.value[fieldName], 'fieldName')
        //@ts-ignore
        return !!errors.value[fieldName]
    });
    console.log(a, 'aaaaaaaaaaaa')
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
            };
        case 4:
            return {
                title: 'Successful Reservation',
                btnTitle: 'Change My Reservation'
            }
        default:
            return {
                title: 'Please add your information',
                btnTitle: 'Next Step'
            }
    }
})

const handleReserve = handleSubmit((bookingInfo) => {
    //@ts-ignore
    const {selectedTime: {start_time}, ...rest} = bookingInfo
    let final = {...rest, date: addTimeToDate(rest.date, start_time)}
    console.log(final);
    // const {time,...rest} = bookingInfo;
    // console.log(fromUnixTime(1718882100));
    // return;
    // if(time && date.value){
    // const dateTime = date.value.setHours(time[0], time[1])
    // const unixTime = JSON.stringify(getUnixTime(dateTime))
    makeReservation(final)
    // }
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
                {{errors}} ---- {{stepInvalid}}
                <form class="card-body"
                      @submit.prevent="handleReserve"
                      novalidate>
                    <div class="card-title justify-center mb-5">
                        <h2 class="font-bold text-3xl">
                            {{company?.name}}
                        </h2>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg">{{stepInformation.title}}</h4>
                        <div class="divider divider-neutral my-5 w-full"></div>
                    </div>
                    <BookServiceSelect v-if="services" v-show="step === 0" name="service" :services="services"/>
                    <div v-show="step === 1" class="grid grid-cols-9 justify-center">
                        <div class="col-span-6">
                            {{date}}
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
                                {{ selectedTime ? moment(selectedTime.start_time).format('HH : mm') : '00 : 00' }}
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
                    <div v-if="step === 4" class="flex flex-col gap-3">
                        <div v-for="(info, key) in confirmedReservation">
                            {{key}}: <b>{{info}}</b>
                        </div>
                    </div>
                    <button
                        :type="step < 3 ? 'button' : 'submit'"
                        :disabled="stepInvalid"
                        @click="handleNextStep"
                        class="btn btn-primary mt-5"
                    >
                        <span v-if="loading" class="loading loading-bars loading-md"></span>
                        <span v-else>
                            {{stepInformation.btnTitle}}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
