<script setup lang="ts">
defineProps(['title', 'value', 'desc'])
</script>

<template>
    <div class="stats shadow-2xl">
        <div class="stat">
            <div class="stat-title">{{ title }}</div>
            <div class="stat-value text-2xl">{{ value }}</div>
            <div class="stat-desc">{{ desc }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>
