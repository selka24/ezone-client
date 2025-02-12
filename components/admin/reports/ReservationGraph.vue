<script setup lang="ts">
import {
    getCurrentMonthRange,
    getCurrentWeekRange,
    getFormattedCurrentWeekRange,
    getLastThreeMonthsRange
} from "~/helpers/dateHelpers";
import {format, eachDayOfInterval, parseISO} from 'date-fns';
import type {ClientReservation} from "~/interfaces/main-types";
import ReportCard from "~/components/admin/reports/ReportCard.vue";
import ReservationStats from "~/components/admin/reports/ReservationStats.vue";

const {$apiService} = useNuxtApp();
const companyStore = useCompanyStore();

const activeFilter = ref(0)

const filtersConfig = [
    {title: '7 D', filters: getCurrentWeekRange()},
    {title: '1 M', filters: getCurrentMonthRange()},
    {title: '3 M', filters: getLastThreeMonthsRange()},
]

const params = computed(() => {
    const {start, end} = filtersConfig[activeFilter.value].filters;
    return {
        start_date: start,
        end_date: end,
    }
})

const formatedParams = computed(() => {
    return {
        start_date: format(params.value.start_date, 'yyyy-MM-dd'),
        end_date: format(params.value.end_date, 'yyyy-MM-dd'),
    }
})


const chartOptions = {
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: true,
        offsetY: 0,
        formatter: function (val: number) {
            if(val > 0) return val;
        }
    },
    markers: {
        size: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return val.toFixed(0);
            },
        },
        // title: {
        //     text: 'Nr. i rezervimeve'
        // },
    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false,
        }
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val: number) {
                return val.toFixed(0)
            }
        },
    }
}


const {data: reservations, status: apiStatus} = useAsyncData<{ results: ClientReservation[] }>(
    'reservationGraph',
    () => $apiService.get(`/statistics/company/${companyStore.company?._id}`, formatedParams.value),
    {
        watch: [formatedParams]
    }
);

const reservationsChartData = computed(() => {
    console.log(reservations.value, apiStatus.value, 'ssss success')
    if(!reservations.value?.results || apiStatus.value !== 'success') return [];
    const allDates = eachDayOfInterval({ start: params.value.start_date, end: params.value.end_date })

    const reservationsMap = reservations.value.results.reduce((acc, reservation) => {
        const dayKey = format(parseISO(reservation.date), 'yyyy-MM-dd');
        acc.set(dayKey, (acc.get(dayKey) || 0) + 1);
        return acc;
    }, new Map<string, number>());

    return allDates.map(date => {
        const dateString = format(date, 'yyyy-MM-dd');
        return {
            x: format(date, 'MM/dd/yyyy'),
            y: reservationsMap.get(dateString) || 0
        };
    });
})

const handleFilterChange = (idx: number) => {
    activeFilter.value = idx;
}

</script>

<template>
    <ReportCard class="col-span-full lg:col-span-7">
        <template #title>Rezervimet</template>
        <template #actions>
            <div role="tablist" class="tabs tabs-boxed">
                <a
                    v-for="(fConfig, idx) in filtersConfig"
                    @click="handleFilterChange(idx)"
                    :key="idx"
                    role="tab"
                    :class="[{'tab-active': activeFilter === idx}]"
                    class="tab">
                    {{fConfig.title}}
                </a>
            </div>
        </template>
        <apexchart
            width="100%"
            height="350"
            :options="chartOptions"
            :series="[{name: 'Nr. i rezervimeve', data: reservationsChartData}]"
        />
    </ReportCard>
    <ReservationStats
        class="col-span-full order-1 lg:order-last lg:col-span-5"
        :time-range="formatedParams"
        :total-reservations="reservations?.results?.length || 0"
    />
</template>

<style scoped>

</style>