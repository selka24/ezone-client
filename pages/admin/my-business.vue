<script setup lang="ts">
import InputText from "~/components/inputs/InputText.vue";
import {companyValidationSchema} from '~/validations'
import InputToggle from "~/components/inputs/InputToggle.vue";

const companyStore = useCompanyStore();
const {company} = storeToRefs(companyStore);
const editMode = ref(false);

const initialValues = computed(() => {
    return company || {}
})

const {handleSubmit} = useForm({
    validationSchema: companyValidationSchema,
    initialValues: initialValues.value
})

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
    </div>
</template>

<style scoped>

</style>
