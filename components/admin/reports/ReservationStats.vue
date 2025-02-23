<script setup lang="ts">
const props = defineProps<{
    timeRange: {
        start_date: string
        end_date: string
    },
    totalReservations: number
}>();

const {$apiService} = useNuxtApp();
const companyStore = useCompanyStore();

const timeRange = computed(() => props.timeRange)

const {data: stats} = useAsyncData<any>(
    'reservationStats',
    () => $apiService.get(`/statistics/bookings-average/company/${companyStore.company?._id}`, props.timeRange),
    {
        watch: [timeRange],
    }
)
</script>

<template>
    <div>
        <div class="stats bg-base-300 w-full">
            <div class="stat">
                <div class="stat-title">Total</div>
                <div class="stat-value text-primary">{{totalReservations}}</div>
                <div class="stat-desc">
                    Numri total i rezervimeve
                </div>
            </div>
            <div class="stat">
                <div class="stat-title">Avg. Reservations</div>
                <div class="stat-value text-primary">{{ stats?.averageBookingsPerDay.toFixed(1) || 'N/A' }}</div>
                <div class="stat-desc">
                    Numri mesatar
                </div>
            </div>
            <div class="stat">
                <div class="stat-title">Peak Time</div>
                <div class="stat-value text-primary">{{stats?.peakTime || 'N/A'}}</div>
                <div class="stat-desc">
                    Orari me i kerkuar
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>