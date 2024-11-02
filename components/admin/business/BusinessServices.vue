<script setup lang="ts">
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import type {Service} from "~/interfaces/main-types";

const ServiceInputGroup = defineAsyncComponent(() => import("~/components/inputs/ServiceInputGroup.vue"));

const companyStore = useCompanyStore();
const { services } = storeToRefs(companyStore);
const { $api } = useNuxtApp();

const showModal = ref(false)
const editService = ref<Service | null>(null);
const serviceModal = ref<any>(null);

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

const handleModalOpen = (service?: Service) => {
    if(service) {
        editService.value = service;
    }
    showModal.value = true;
    serviceModal.value?.showModal();
}
</script>

<template>
    <div class="flex flex-col">
        <dialog

            id="serviceModal"
            ref="serviceModal"
            class="modal">
            <div class="modal-box">
                <form method="dialog">
                    <button @click="() => showModal = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-6">✕</button>
                </form>
                <h3 class="font-bold text-lg px-1">{{ editService ? 'Edit Service' : 'Add New Service' }}</h3>
                <ServiceInputGroup
                    class="modalServiceForm mt-2"
                    v-if="showModal"
                    @serviceSubmit="handleNewService"
                />
            </div>
        </dialog>
        <div class="flex justify-between items-end gap-10 lg:gap-20">
            <div class="prose min-w-max">
                <h2>
                    Services
                </h2>
                <p>
                    View or change the your services
                </p>
            </div>
            <button class="btn btn-primary ml-auto" @click="handleModalOpen()">
                <fai icon="plus"/>
                Add Service
            </button>
        </div>
        <div class="divider divider-neutral"></div>
        <div class="grid grid-cols-6 mt-6">
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

<style lang="postcss">
</style>