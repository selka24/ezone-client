<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import BookTimePicket from "~/components/booking/BookTimePicket.vue";
import type {Company} from "~/interfaces/main-types";
import {bookingFormValidationSchema} from '~/validations'
import BookServiceSelect from "~/components/booking/BookServiceSelect.vue";

const {$api} = useNuxtApp();
const {addZero} = useUtils();
const route = useRoute();

const {data: company, pending} = await useAsyncData<Company>('bookCompany', () => $api(`/company/${route.params.business_url}`, {
    method: 'GET',
}))

const date = ref(new Date());
const time = ref<[number, number]>([0, 0]);

const { handleSubmit } = useForm({
    validationSchema: bookingFormValidationSchema
})

const services = computed(() => {
    if(company.value?.employees?.[0]){
        return company.value?.employees?.[0].services
    }
    return []
})
</script>

<template>
    <div class="flex justify-center items-center p-10">
        <div class="max-w-screen-sm w-full">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="card-title justify-center mb-5">
                        <h2 class="font-bold text-3xl">
                            {{company?.name}}
                        </h2>
                    </div>
                    <BookServiceSelect name="service_id" :services="services"/>
                    <div>
                        <h4 class="font-semibold text-lg">Please select a date and time</h4>
                        <div class="divider divider-neutral my-5 w-full"></div>
                    </div>
                    <div class="grid grid-cols-9 justify-center">
                        <div class="col-span-6">
                            <DatePicker v-model="date"
                                        class="p-0 m-0"
                                        :min-date="new Date()"
                                        :expanded="true"
                                        :transparent="true"
                                        :borderless="true"
                                        :is-dark="true"/>
                        </div>
                        <div class="col-span-1 w-full flex justify-center">
                            <div class="divider divider-horizontal divider-neutral m-0 h-full"></div>
                        </div>
                        <div class="col-span-2">
                            <div class="input input-bordered flex items-center justify-center mb-4">
                                {{addZero(time[0])}} : {{addZero(time[1])}}
                            </div>
                            <div class="flex overflow-auto max-h-[270px]">
                                <BookTimePicket v-model="time" :minutes-interval="5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
