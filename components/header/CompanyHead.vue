<script setup lang="ts">
const companyStore = useCompanyStore();



</script>

<template>
    <div>
        <h2 class="font-bold text-3xl">
            <client-only>
                {{ companyStore.company?.name || "" }}
            </client-only>
        </h2>
    </div>
</template>

<style scoped>

</style>
