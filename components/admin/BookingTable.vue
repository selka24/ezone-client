<script setup lang="ts">
    import moment from "moment";

    const {$apiService} = useNuxtApp();

    const companyStore = useCompanyStore();
    const authStore = useAuthStore();
    const bookingTableColumns = [
        {title: 'Stafi', key: 'staffName'},
        {title: 'Orari', key: 'date'},
        {title: 'Klienti', key: 'name'},
        {title: 'Nr. Telefonit', key: 'phone'},
        {title: 'Email', key: 'email'},
        {title: 'Created', key: 'createdAt'},
    ]

    //TODO add types to allbookings
    const {data: allBookings} = useAsyncData<any>('allBookings', () => $apiService.get(`bookings/company/${authStore.authUser?.companyProfileId}`))

    const tableData = computed<any>(() => {
        if(allBookings.value){
            return allBookings.value.map((b: any) => {
                return {
                    id: b._id,
                    staffName: `${b.employee?.name} ${b.employee?.lastname}`,
                    date: moment(b.date).format('HH:mm DD MMM'),
                    name: b.name,
                    phone: b.phone,
                    email: b.email,
                    createdAt: moment(b.createdAt).format('HH:mm DD MMM'),
                }
            });
        }
        return []
    })
</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="({title, key}) in bookingTableColumns" :key="`head-${key}`">
                        {{title}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in tableData">
                    <th v-for="({key}) in bookingTableColumns" :key="`body-${data.id}-${key}`">
                        {{data[key]}}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>