<script setup lang="ts">
import type {Service} from "~/interfaces/main-types";
import {serviceValidationSchema} from "~/validations";
import InputText from "~/components/inputs/InputText.vue";
import InputDuration from "~/components/inputs/InputDuration.vue";
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import {useCompanyStore} from "~/stores/companyStore";

const {$api} = useNuxtApp();
const companyStore = useCompanyStore()
const emit = defineEmits<{
    servicesSubmit: [Service[]]
}>()
const services = ref<Service[]>([]);
const {handleSubmit, resetForm} = useForm<Service>({
    validationSchema: serviceValidationSchema,
    initialValues: {
        duration: 0
    }
})

const handleRemoveService = (idx: number) => {
    services.value.splice(idx, 1);
}

const handleServicesSubmit = handleSubmit(async (values) => {
    console.log(values)
    try {
        const data = await $api<Service>('/service/create', {
            method: 'POST',
            body: {...values, company: companyStore.company?._id}
        })

        services.value.push(data);
        resetForm();
    } catch (e) {

    }
})

const handleContinue = () => {
    emit('servicesSubmit', services.value);
}
</script>

<template>
    <div class="card-body">
        <form @submit.prevent="handleServicesSubmit" novalidate>
            <div class="grid grid-cols-10 gap-5 w-full">
                <InputText name="title" class="col-span-4" :attributes="{placeholder: 'Emri i shërbimit'}"/>
                <InputDuration name="duration" class="col-span-2"/>
                <InputText name="price" class="col-span-2" :attributes="{placeholder: 'ALL', type: 'number'}"/>
                <button class="btn btn-outline btn-primary mt-9 mb-auto col-span-2">Add</button>
            </div>
        </form>
        <div class="divider divider-neutral"></div>
        <div class="flex flex-wrap gap-5">
            <div v-for="(service, idx) in services"
                 class="relative"
                 :key="service.title + service.price">
                <fai @click="handleRemoveService(idx)"
                     icon="circle-xmark"
                     class="absolute cursor-pointer -right-2 text-error text-xl" />
                <ServiceStat :service="service"/>
            </div>
        </div>
        <h2 class="text-info" v-show="!services.length">Shtoni te pakten nje sherbim per te vazhduar ne hapin tjeter</h2>
        <button class="btn btn-primary mt-10"
                @click="handleContinue"
                :disabled="services.length === 0">
            Vazhdo
        </button>
    </div>
</template>

<style scoped>

</style>
