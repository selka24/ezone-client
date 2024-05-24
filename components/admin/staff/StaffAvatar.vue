<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";

defineProps<{staff: Employee}>()
</script>

<template>
    <div class="stats shadow-2xl">
        <div class="stat">
            <div class="stat-title">
                {{ staff.name }}
            </div>
            <div class="avatar">
                <div class="w-20 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Tailwind-CSS-Avatar-component" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
