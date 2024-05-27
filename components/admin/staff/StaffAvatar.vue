<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";

defineProps<{staff: Employee}>()
</script>

<template>
    <div class="stat max-w-max shadow-2xl">
        <div class="stat-figure text-secondary">
            <div class="avatar my-auto">
                <div class="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
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
