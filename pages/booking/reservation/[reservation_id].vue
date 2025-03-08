<script setup lang="ts">
import type {ClientReservation} from "~/interfaces/main-types";
import {format, isAfter} from "date-fns"
const {$apiService, $Swal, $toast} = useNuxtApp();
const route = useRoute();
const {reservation_id} = route.params;

const {data: myReservation, refresh} = useAsyncData<ClientReservation>('myReservation', () => $apiService.get(`/reservation/${reservation_id}`));

const reservationExpired = computed(() => {
    if(!myReservation.value) return false;
    return isAfter(new Date(), new Date(myReservation.value.date))
})

const reservationStatusDisplay = computed(() => {
    let text = 'Rezervimi eshte kryer me sukses!', color = 'successful';
    if(myReservation.value){
        if(reservationExpired.value) {
            text = 'Rezervimi ka skaduar';
            color = 'canceled';
        } else {
            switch(myReservation.value.status){
                case ReservationStatuses.PENDING:
                    text = `Rezervimi eshte ne pritje. Do te njoftoheni menjehere sapo te konfirmohet!`;
                    color = 'pending';
                    break;
                case ReservationStatuses.CANCELED_BY_COMPANY:
                case ReservationStatuses.CANCELED_BY_CUSTOMER:
                    text = `Rezervimi eshte anulluar!`;
                    color = 'canceled';
                    break;
            }
        }
    }
    return { text, color};
})

const canEditReservation = computed(() => {
    const resStatus = myReservation.value?.status
    return (
        resStatus  !== ReservationStatuses.CANCELED_BY_CUSTOMER
        && resStatus !== ReservationStatuses.CANCELED_BY_COMPANY
        && !reservationExpired.value
    )
})

const time = computed(() => {
    if(myReservation.value){
        const date = new Date(myReservation.value.date);
        const timeFormat = format(date, 'HH:mm');
        return `${timeFormat}`;
    }
    return '00:00'
})

const handleCancel = () => {
    $Swal.fire({
        title: `Jeni të sigurt qe doni ta anulloni rezervimin tuaj?`,
        showCancelButton: true,
        confirmButtonText: 'Anullo',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                await $apiService.put(`/booking${myReservation.value?._id}`, {
                    body: {
                        status: ReservationStatuses.CANCELED_BY_CUSTOMER
                    }
                })
                await refresh();
                return 'isCanceled';
            } catch (e) {
                return false;
            }
        }
    })
    //     .then(({value}) => {
    //     if(value === 'isCanceled'){
    //         $toast.success(`Rezervimi u anullua me sukses!`);
    //     }
    // })
}
</script>

<template>
    <div v-if="myReservation" class="flex flex-col items-center px-3">
       <div
            class="card max-w-screen-sm w-full shadow-2xl mt-10 overflow-hidden">
            <div class="text-black text-lg font-semibold py-5 px-5 bg-opacity-50" :class="`bg-${reservationStatusDisplay.color} shadow-${reservationStatusDisplay.color}-50`">
                {{ reservationStatusDisplay.text }}
            </div>
            <div class="card-body p-0">
                <div class="grid grid-cols-6 w-full">
                    <div class="col-span-full flex sm:flex-col shadow-lg items-center sm:col-span-2 bg-base-200 bg-blend-darken p-8">
                        <div class="avatar mx-auto">
                            <div class="w-32 !flex items-center justify-center rounded-full shadow-lg">
                                <div>{{ myReservation?.company.name}}</div>
                            </div>
                        </div>
                        <div class="mt-3">{{ myReservation?.company.description}}</div>
                    </div>
                    <div class="col-span-full sm:col-span-4 p-8">
                        <div class="text-xl">
                            {{ format(new Date(myReservation.date), 'EE, dd LLLL') }}
                        </div>
                        <div class="stat-value">
                            {{ time }}
                        </div>
                        <div class="text-lg prose mt-5">
                            <p>
                                Sherbimet: <b>{{myReservation?.service.title}}</b>
                            </p>
                            <p>
                                Stafi: <b>{{myReservation?.employee.name}}</b>
                            </p>
                            <p>
                                Nr. Telefonit: <b>{{myReservation.phone}}</b>
                            </p>
                            <p>
                                Email: <b>{{myReservation.email}}</b>
                            </p>
                        </div>

                        <div v-if="canEditReservation" class="card-actions justify-center mt-24">
                            <button class="btn btn-primary">Edit</button>
                            <button @click="handleCancel" class="btn btn-error">Cancel</button>
                        </div>
                        <div v-else class="card-actions justify-start mt-24">
                            <nuxt-link :to="`/booking/${myReservation.company._id}`" class="btn btn-primary">
                                Rezervim i ri
                            </nuxt-link>
                            <a :href="`tel:${myReservation.company.phone}`" class="btn btn-neutral">
                                Kontakto
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Card Actions -->

            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../assets/css/main.css";

.shadow-pending-50{
    @apply shadow-warning/10;
}
.bg-pending{
    @apply bg-warning;
}
.shadow-canceled-50{
    @apply shadow-error/10;
}
.bg-canceled{
    @apply bg-error;
}
.shadow-successful-50{
    @apply shadow-success/10;
}
.bg-successful{
    @apply bg-success;
}
</style>