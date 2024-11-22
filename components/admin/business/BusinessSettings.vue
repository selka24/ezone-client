<script setup lang="ts">

import InputToggle from "~/components/inputs/InputToggle.vue";
</script>

<template>
    <div class="flex flex-col">
        <div class="prose min-w-max">
            <h2>
                Booking settings
            </h2>
            <p>
                View or change the booking experience for your customers
            </p>
        </div>
        <div class="divider divider-neutral"></div>
        <div class="w-full">
            <InputToggle class="max-w-max" name="show_price" label="Show prices"/>
            <span class="text-sm">Turn this feature on/off to show/remove prices of your services</span>
        </div>
    </div>
</template>

<style scoped>

</style>