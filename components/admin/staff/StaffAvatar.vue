<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";

defineProps<{staff: Employee}>()
</script>

<template>
    <div class="stat max-w-max shadow-2xl">
        <div class="stat-figure text-secondary">
            <fai icon="user" class="text-[3rem] text-white"/>
        </div>
        <div class="stat-value text-lg font-semibold">
            {{ staff.name }} {{ staff.lastname }}
        </div>
        <div class="stat-title">
            {{ staff.job_title }}
        </div>

        <div class="stat-desc text-secondary">
<!--            {{JSON.stringify(staff.services)}}-->
            <span v-for="service in staff.services" :key="service.title">{{service.title}} &nbsp;</span>
        </div>
    </div>
</template>

<style scoped>

</style>
