<script setup lang="ts">
import AdminWelcomeScreen from "~/components/admin/AdminWelcomeScreen.vue";
const companyStore = useCompanyStore();

if(!companyStore.company){
    // await companyStore.actGetMyCompany();
}
</script>

<template>
    <div>
        <AdminWelcomeScreen v-if="!companyStore.company"/>
    </div>
</template>

<style scoped>

</style>
