<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import TimePicker from "~/components/ui/TimePicker.vue";

const route = useRoute();
const date = ref(new Date());
const time = ref(0)

</script>

<template>
    <div class="flex justify-center items-center p-10">
        <div class="max-w-screen-sm w-full">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="card-title justify-center">
                        <h2 class="font-bold text-3xl">
                            {{route.params.business_url}}
                        </h2>
                    </div>
                    <div class="prose">
                        <h4>Please select a date</h4>
                    </div>
                    <div class="flex gap-10">
                        <DatePicker v-model="date"
                                    :min-date="new Date()"
                                    view="weekly"
                                    :expanded="true"
                                    :transparent="true"
                                    :borderless="true"
                                    :is-dark="true"/>
                        <TimePicker v-model="time"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
