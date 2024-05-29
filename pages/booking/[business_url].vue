<script setup lang="ts">
const route = useRoute();


</script>

<template>
    <div class="px-20">
        <h1>{{ route.params.business_url }}</h1>
        <client-only>
            <BaseCalendar />
        </client-only>
    </div>
</template>

<style scoped>

</style>
