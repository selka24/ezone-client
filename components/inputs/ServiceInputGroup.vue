<script setup lang="ts">
import InputDuration from "~/components/inputs/InputDuration.vue";
import InputText from "~/components/inputs/InputText.vue";
import type {Service} from "~/interfaces/main-types";
import {serviceValidationSchema} from "~/validations";

const emit = defineEmits<{
    serviceSubmit: [Service]
}>()

const {handleSubmit, resetForm} = useForm<Service>({
    validationSchema: serviceValidationSchema,
    initialValues: {
        duration: 0
    }
})

const handleServicesSubmit = handleSubmit((values) => {
    emit('serviceSubmit', values);
    resetForm();
})
</script>

<template>
    <form @submit.prevent="handleServicesSubmit" novalidate>
        <div class="grid grid-cols-10 gap-5 w-full">
            <InputText name="title" class="col-span-4" :attributes="{placeholder: 'Emri i shërbimit'}"/>
            <InputDuration name="duration" class="col-span-2"/>
            <InputText name="price" class="col-span-2" :attributes="{placeholder: 'ALL', type: 'number'}"/>
            <button class="btn btn-outline btn-primary mt-9 mb-auto col-span-2">Add</button>
        </div>
    </form>
</template>

<style scoped>

</style>
