<script setup lang="ts">
import AdminWelcomeScreen from "~/components/admin/AdminWelcomeScreen.vue";
import BookingTable from "~/components/admin/BookingTable.vue";
// const companyStore = useCompanyStore();
const authStore = useAuthStore();

// onBeforeMount(() => {
//     companyStore.actGetMyCompany();
// })
</script>

<template>
    <div>
        <AdminWelcomeScreen v-if="!authStore.authUser?.companyProfileId"/>
        <BookingTable />
    </div>
</template>

<style scoped>

</style>
