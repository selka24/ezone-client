<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import BookTimePicket from "~/components/booking/BookTimePicket.vue";
import type {Company, Service} from "~/interfaces/main-types";
import {bookingFormValidationSchema} from '~/validations'
import BookServiceSelect from "~/components/booking/BookServiceSelect.vue";
import InputText from "~/components/inputs/InputText.vue";
import {getUnixTime} from "date-fns";
import moment from "moment";

const {$api} = useNuxtApp();
const {addZero} = useUtils();
const route = useRoute();

const companyId = route.params.business_url;

const {data: company, pending} = await useAsyncData<Company>('bookCompany', () => $api(`/company/${companyId}`, {
    method: 'GET',
}))

const {data: services} = await useAsyncData<Service[]>('allServices', () => $api(`/services/company/${companyId}`, {
    method: "GET"
}))



console.log(company, 'companyyyy')

const { handleSubmit, errors, values: reservationInfo } = useForm({
    validationSchema: toTypedSchema(bookingFormValidationSchema),
    initialValues: {
        //@ts-ignore
        time: [0,0]
    }
})

const {value: date} = useField<Date | undefined>('date');
const {value: time} = useField<[number, number]>('time');
const {value: selectedTime} = useField<Date>('selectedTime');
const step = ref(0);
const loading = ref(false);
const confirmedReservation = ref<any>(null)

const getAvailableBookings = async () => {
    console.log({
        service: reservationInfo.service_id,
        company: company.value?._id,
        date: dateTime.value
    })
    // return;
    try {
        const data = await $apiService.post('bookings/available', {
            body: {
                service: reservationInfo.service_id,
                company: company.value?._id,
                date: dateTime.value
            }
        })
        console.log(data, 'dataaaaaa')
        return data
    } catch (e) {
        return false
    }
}

const {data: availableBookings, status: statusTimes} = await useAsyncData<any>('avlblBook', getAvailableBookings, {
    immediate: false,
    watch: [date]
})

const handleNextStep = async () => {
    let goToNextStep = true;
    if(step.value < 3) {
        if(step.value === 1){
            // goToNextStep = await getAvailableBookings();
        }
        console.log('goToNextStep', goToNextStep)
        if(goToNextStep)
            step.value++
    }
}

const {$apiService} = useNuxtApp();

const dateTime = computed(() => {
    if(reservationInfo.date && reservationInfo.time){
        const date = moment(reservationInfo.date);
        const [hour, minute] = reservationInfo.time;
        date.hour(hour).minute(minute);
        return date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    }
    return null;
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
        case 3:
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

// const services = computed(() => {
//     if(company.value?.employees?.[0]){
//         return company.value?.employees?.[0].services
//     }
//     return []
// })

const handleReserve = handleSubmit((bookingInfo) => {
    const {time,...rest} = bookingInfo;
    // console.log(fromUnixTime(1718882100));
    // return;
    if(time && date.value){
        const dateTime = date.value.setHours(time[0], time[1])
        const unixTime = JSON.stringify(getUnixTime(dateTime))
        makeReservation({
           ...rest,
           date: unixTime,
           time: unixTime,
        })
    }
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
                        <h2 class="font-bold text-3xl">
                            {{company?.name}}
                        </h2>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg">{{stepInformation.title}}</h4>
                        <div class="divider divider-neutral my-5 w-full"></div>
                    </div>
                    <BookServiceSelect v-if="services" v-show="step === 0" name="service_id" :services="services"/>
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
                                {{ selectedTime ? moment(selectedTime).format('HH : mm') : '00 : 00' }}
                            </div>
                            <div class="overflow-auto h-[240px] h-100 no-scrollbar w-full relative">
                                <span v-if="statusTimes === 'pending'" class="loading loading-spinner loading-md absolute-center"></span>
                                <div v-else-if="availableBookings" class="flex flex-col gap-3">
                                    <label
                                        v-for="b in availableBookings"
                                        :for="b.clock.start_time"
                                        :class="['badge badge-xl w-full uppercase cursor-pointer', (selectedTime !== b.clock.start_time ? 'badge-outline': 'badge-primary')]"
                                    >
                                        <input type="radio"
                                               hidden
                                               name="timeRadio"
                                               :id="b.clock.start_time"
                                               v-model="selectedTime"
                                               :value="b.clock.start_time">
                                        <span class="py-1">
                                        {{ moment(b.clock.start_time).format('HH:mm') }}
                                    </span>
                                    </label>
                                </div>
                                <div class="bg-base-100 pointer-events-none sticky bottom-0 flex h-24 cursor-default [mask-image:linear-gradient(transparent,#000000)]"></div>
                            </div>
                        </div>
                    </div>
                    <div v-show="step === 2">
                        <InputText name="name"/>
                        <InputText name="email"/>
                        <InputText name="phone"/>
                    </div>
                    <div v-if="step === 3" class="flex flex-col gap-3">
                        <div v-for="(info, key) in confirmedReservation">
                            {{key}}: <b>{{info}}</b>
                        </div>
                    </div>
                    <button v-if="step !== 2" @click="handleNextStep" class="btn btn-primary mt-5" type="button">{{stepInformation.btnTitle}}</button>
                    <button v-else class="btn btn-primary mt-5" type="submit">
                        <span v-if="loading" class="loading loading-bars loading-md"></span>
                        <span v-else>
                            Reserve
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
