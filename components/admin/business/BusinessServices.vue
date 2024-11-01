<script setup lang="ts">
import ServiceInputGroup from "~/components/inputs/ServiceInputGroup.vue";
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import type {Service} from "~/interfaces/main-types";

const companyStore = useCompanyStore();
const { services } = storeToRefs(companyStore);
const {$api} = useNuxtApp();

const handleNewService = async (newService: Service) => {
    try{
        await $api('/service/create', {
            method: 'POST',
            body: {...newService, company: companyStore.company?._id}
        })

        await companyStore.actGetAllService();
    } catch (e) {

    }
}

const handleDeleteService = async (id: string | undefined) => {
    try {
        await $api(`/service/${id}`, {
            method: "DELETE"
        })
        await companyStore.actGetAllService();
    } catch (e) {

    }
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-between gap-10 lg:gap-20">
            <div class="prose min-w-max">
                <h2>
                    Services
                </h2>
                <p>
                    View or change the your services
                </p>
            </div>
        </div>
        <div class="grid grid-cols-6 mt-6">
            <div class="col-span-6 md:col-span-5">
                <ServiceInputGroup @serviceSubmit="handleNewService"/>
            </div>
            <div class="flex flex-wrap gap-5 col-span-6 mt-10">
                <div v-for="(service, idx) in services"
                     class="relative"
                     :key="service.title + service.price">
                    <fai
                        @click="handleDeleteService(service?._id)"
                        icon="circle-xmark"
                        class="absolute cursor-pointer -right-2 text-error text-xl" />
                    <ServiceStat :service="service"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>