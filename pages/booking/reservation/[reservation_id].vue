<script setup lang="ts">
import type {ClientReservation} from "~/interfaces/main-types";
import {format} from "date-fns"
import {locale} from "moment";
import Locale = Intl.Locale;
const {$apiService} = useNuxtApp();
const route = useRoute();
const {reservation_id} = route.params;

const {data: myReservation, status} = useAsyncData<ClientReservation>('myReservation', () => $apiService.get(`/reservation/${reservation_id}`));

const reservationStatusDisplay = computed(() => {
    let text = 'Rezervimi eshte kryer me sukses!', color = 'success';
    if(myReservation.value){
        switch(myReservation.value.status){
            case ReservationStatuses.PENDING:
                text = `Rezervimi eshte ne pritje. Do te njoftoheni menjehere sapo te konfirmohet!`;
                color = 'warning';
                break;
        }
    }
    return { text, color};
})

const time = computed(() => {
    if(myReservation.value){
        const date = new Date(myReservation.value.date);
        const timeFormat = format(date, 'HH:mm');
        return `${timeFormat}`;
    }
    return '00:00'
})
</script>

<template>
    <div class="flex flex-col items-center px-3">
        <div class="avatar mx-auto">
            <div class="w-32 !flex items-center justify-center rounded-full shadow-lg">
                <div>{{ myReservation?.company.name}}</div>
            </div>
        </div>
        <div class="mt-3">{{ myReservation?.company.description}}</div>
        <div
            v-if="myReservation"
            class="card max-w-screen-sm w-full shadow-2xl mt-10 overflow-hidden">
            <div class="text-white py-5 px-5 bg-opacity-50" :class="`bg-${reservationStatusDisplay.color} shadow-${reservationStatusDisplay.color}-50`">
                {{ reservationStatusDisplay.text }}
            </div>
            <div class="card-body">
                <div class="flex flex-col gap-5"></div>
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

                <!-- Card Actions -->
                <div class="card-actions justify-center mt-24">
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-error">Cancel</button>
                </div>
            </div>
        </div>

<!--        {{myReservation}}-->
    </div>
</template>

<style scoped>
.shadow-warning-50{
    @apply shadow-warning/10;
}
</style>