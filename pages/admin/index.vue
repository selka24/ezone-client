<script setup lang="ts">
import WelcomeScreen from "~/components/admin/WelcomeScreen.vue";
const companyStore = useCompanyStore();
</script>

<template>
    <div>
        <WelcomeScreen v-if="!companyStore.company"/>
    </div>
</template>

<style scoped>

</style>
