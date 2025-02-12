<script setup lang="ts">
    import moment from "moment";
    import LoaderButton from "~/components/ui/LoaderButton.vue";
    import {ReservationStatuses} from '~/interfaces/main-types'
    const {$apiService} = useNuxtApp();
    const {copyToClipboard} = useUtils();
    const loadingId = ref<string[]>([])

    const authStore = useAuthStore();
    const bookingTableColumns = [
        {title: 'ID', key: 'id'},
        {title: 'Orari', key: 'date'},
        {title: 'Klienti', key: 'name'},
        {title: 'Nr. Telefonit', key: 'phone'},
        {title: 'Email', key: 'email'},
        {title: 'Stafi', key: 'staffName'},
        {title: 'Status', key: 'status'},
    ]

    //TODO add types to allbookings
    const {data: allBookings, refresh: refreshBookings} = useAsyncData<any>('allBookings', () => $apiService.get(`bookings/company/${authStore.authUser?.companyProfileId}`))

    console.log(allBookings)

    const statusColor = (status: string) => {
        switch (status) {
            case ReservationStatuses.ACCEPTED:
                return 'success';
            case ReservationStatuses.CANCELED_BY_COMPANY:
            case ReservationStatuses.CANCELED_BY_CUSTOMER:
                return 'error';
            case ReservationStatuses.PENDING:
                return 'warning';
            default:
                return 'neutral';
        }
    }

    const tableData = computed<any>(() => {
        if(allBookings.value){
            return allBookings.value.map((b: any) => {
                return {
                    status: b.status,
                    id: b._id,
                    staffName: `${b.employee?.name} ${b.employee?.lastname}`,
                    date: moment(b.date).format('DD MMM HH:mm'),
                    name: b.name,
                    phone: b.phone,
                    email: b.email,
                    createdAt: moment(b.createdAt).format('HH:mm DD MMM'),
                }
            });
        }
        return []
    })

    const handleStatusChange = async (id: string, status: ReservationStatuses) => {
        const loadId = `${status}-${id}`;
        loadingId.value = [...loadingId.value, loadId];
        try {
            await $apiService.put(`/booking${id}`, {
                body: {
                    status
                }
            })
        } catch (e) {

        } finally {
            await refreshBookings();
            loadingId.value = loadingId.value.filter(lId => lId !== loadId);
        }
    }
</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="({title, key}) in bookingTableColumns" :key="`head-${key}`">
                        {{title}}
                    </th>
                    <th>
                        Veprimet
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in tableData">
                    <th v-for="({key}) in bookingTableColumns" :key="`body-${data.id}-${key}`">
                        <div :class="key === 'status' ? `badge badge-${statusColor(data.status)}` : ''">
                            {{data[key]}}
                        </div>
                        <fai
                            v-if="key === 'id'"
                            icon="copy"
                            class="text-sm cursor-pointer"
                            @click="copyToClipboard(data.id)"
                        />
                    </th>
                    <th>
                        <div class="flex gap-2 items-center justify-center">
                            <LoaderButton
                                @click="handleStatusChange(data.id, ReservationStatuses.ACCEPTED)"
                                :loading="loadingId.includes(`${ReservationStatuses.ACCEPTED}-${data.id}`)"
                                :disabled="data.status !== ReservationStatuses.PENDING"
                                class="btn-xs btn-success">
                                <fai icon="check" class="mx-0.5"/>
                            </LoaderButton>
                            <LoaderButton
                                class="btn-xs btn-error"
                                @click="handleStatusChange(data.id, ReservationStatuses.CANCELED_BY_COMPANY)"
                                :loading="loadingId.includes(`${ReservationStatuses.CANCELED_BY_COMPANY}-${data.id}`)"
                                :disabled="data.status !== ReservationStatuses.PENDING && data.status !== ReservationStatuses.ACCEPTED"
                            >
                                <fai icon="xmark" class="mx-0.5"/>
                            </LoaderButton>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>