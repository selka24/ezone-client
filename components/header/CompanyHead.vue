<script setup lang="ts">
const companyStore = useCompanyStore();

</script>

<template>
    <div>
        <h2 class="font-bold text-3xl">
            {{ companyStore.company?.name }}
        </h2>
    </div>
</template>

<style scoped>

</style>
