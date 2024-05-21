<script setup lang="ts">
import type {CompanyMainInfo, Service} from "~/interfaces/main-types";
import {serviceValidationSchema} from "~/validations";
import InputText from "~/components/inputs/InputText.vue";
import TimePicker from "~/components/ui/TimePicker.vue";

const {handleSubmit} = useForm<Service[]>({
    validationSchema: serviceValidationSchema,
})

const duration = ref('00:00:00');


    const handleServicesSubmit = handleSubmit(() => {

})
</script>

<template>
    <form @submit.prevent="handleServicesSubmit" class="card-body" novalidate>
        <div class="grid grid-cols-8 gap-5 w-full">

            <InputText name="title" class="col-span-4"/>
            <time-picker v-model="duration" class="col-span-2"/>
<!--        <InputText name="duration" :attributes="{type: 'time'}"/>-->
            <InputText name="price" class="col-span-2"/>
        </div>
    </form>
</template>

<style scoped>

</style>
