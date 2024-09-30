<script setup lang="ts">
import InputText from "~/components/inputs/InputText.vue";
import {companyValidationSchema} from '~/validations'
import InputToggle from "~/components/inputs/InputToggle.vue";
// import ServicesForm from "~/components/admin/createForm/ServicesForm.vue";
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import ServiceInputGroup from "~/components/inputs/ServiceInputGroup.vue";
import type {Service} from "~/interfaces/main-types";

const companyStore = useCompanyStore();
const {company, services} = storeToRefs(companyStore);
const editMode = ref(false);
const {$api} = useNuxtApp();

const initialValues = computed(() => {
    return company || {}
})

const {handleSubmit} = useForm({
    validationSchema: companyValidationSchema,
    initialValues: initialValues.value
})


const handleNewService = async (newService: Service) => {
    // console.log()
    try{
        await $api('/service/create', {
            method: 'POST',
            body: {...newService, company: companyStore.company?._id}
        })

        await companyStore.actGetAllService();
    } catch (e) {

    }
    console.log(newService)
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

const updateCompany = handleSubmit((values) => {

})
</script>

<template>
    <div>
        <form @submit.prevent="updateCompany">
            <div class="flex items-end justify-between">
                <div class="prose">
                    <h2>My Business Profile</h2>
                    <p>View and update your business details</p>
                </div>
                <transition name="page" :duration="100" mode="out-in">
                    <button v-if="!editMode" @click="editMode = !editMode" class="btn btn-primary" type="button">
                        Edit
                    </button>
                    <div v-else>
                        <button @click="editMode = false" class="btn btn-neutral" type="button">
                            Cancel
                        </button>
                        <button class="ml-3 btn btn-primary" type="submit">
                            Update
                        </button>
                    </div>
                </transition>

            </div>
            <div class="divider divider-neutral"></div>
            <div class="flex justify-between gap-10 lg:gap-20">
                <div class="prose min-w-max">
                    <h3>Public profile</h3>
                    <p>This will be displayed on your booking page.</p>
                </div>
                <div class="w-full">
                    <InputText name="name"
                               :no-form-label="true"
                               :attributes="{readonly: !editMode}"/>
                    <InputText name="description"
                               :no-form-label="true"
                               :attributes="{readonly: !editMode}"/>
                    <div class="join w-full">
                        <input class="input input-bordered join-item pr-0"
                               value="https://ezon/booking/"
                               readonly>
                        <InputText name="url" :no-form-label="true" :attributes="{readonly: !editMode, placeholder: 'business-url', class: 'rounded-l-none'}"/>
                    </div>
                </div>
            </div>
            <div class="divider divider-neutral"></div>
            <div class="flex gap-10 lg:gap-20 justify-between">
                <div class="prose min-w-max">
                    <h3>
                        Booking settings
                    </h3>
                    <p>
                        View or change the booking experience for your customers
                    </p>
                </div>
                <div class="w-full">
                    <InputToggle class="max-w-max" name="show_price" label="Show prices"/>
                    <span class="text-sm">Turn this feature on/off to show/remove prices of your services</span>
                </div>
            </div>
        </form>
        <div class="divider divider-neutral"></div>
        <div class="flex flex-col">
            <div class="flex justify-between gap-10 lg:gap-20">
                <div class="prose min-w-max">
                    <h3>
                        Services
                    </h3>
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
    </div>
</template>

<style scoped>

</style>
