<script setup lang="ts">
const {$apiService} = useNuxtApp();
const route = useRoute();
const {reservation_id} = route.params;

const {data: myReservation, status} = useAsyncData('myReservation', () => $apiService.get(`/reservation/${reservation_id}`));
</script>

<template>
    <div>
        {{myReservation}}
    </div>
</template>

<style scoped>

</style>