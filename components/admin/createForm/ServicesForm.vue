<script setup lang="ts">
import type {Service} from "~/interfaces/main-types";
// import {serviceValidationSchema} from "~/validations";
// import InputText from "~/components/inputs/InputText.vue";
// import InputDuration from "~/components/inputs/InputDuration.vue";
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import ServiceInputGroup from "~/components/inputs/ServiceInputGroup.vue";

const companyStore = useCompanyStore();
const emit = defineEmits<{
    servicesSubmit: [Service[]]
}>()
const companyId = companyStore.company?._id

const services = ref<Service[]>([]);
const {$apiService} = useNuxtApp();
// const {handleSubmit, resetForm} = useForm<Service>({
//     validationSchema: serviceValidationSchema,
//     initialValues: {
//         duration: 0
//     }
// })

const handleRemoveService = (idx: number) => {
    services.value.splice(idx, 1);
}

const handleServicesSubmit = async (newService: Service) => {
    try {
        const data: any = await $apiService.post('/service/create', {
          body: {...newService, company: companyId}
        })
        console.log(data, 'dataaa')
        services.value.push({...newService, company: companyId, _id: data._id})
    } catch (e) {

    }
}

const handleContinue = () => {
    emit('servicesSubmit', services.value);
}
</script>

<template>
    <div class="card-body">
        <ServiceInputGroup @serviceSubmit="handleServicesSubmit" />
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
