<script setup lang="ts">
import InputToggle from "~/components/inputs/InputToggle.vue";
import InputText from "~/components/inputs/InputText.vue";
import {companyValidationSchema} from "~/validations";

const companyStore = useCompanyStore();
const editMode = ref(false);

const { handleSubmit } = useForm({
    validationSchema: companyValidationSchema,
    initialValues: companyStore.company
})

const updateCompany = handleSubmit((values) => {

})
</script>

<template>
        <form @submit.prevent="updateCompany">
            <div class="flex items-end justify-between">
                <div class="prose">
                    <h2>My Business Profile</h2>
                    <p>View and customize your business profile</p>
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
            <div class="flex flex-col gap-10">
                <div class="prose min-w-max">
                    <h3>Public profile</h3>
                    <p>This will be displayed on your booking page.</p>
                </div>
                <div class="max-w-[70%]">
                    <InputText name="name"
                               :attributes="{ readonly: !editMode }"
                    />
                    <InputText name="description"
                               :attributes="{ readonly: !editMode }"
                    />
                    <div class="join w-full">
                        <input
                            :class="(!editMode ? 'input-disabled' : '')"
                            class="input input-bordered join-item pr-0"
                            value="https://ezon/booking/"
                            readonly
                        >
                        <InputText
                            name="url"
                            :no-form-label="true"
                            :attributes="{
                                readonly: !editMode,
                                placeholder: 'business-url',
                                class: 'rounded-l-none'
                            }"
                        />
                    </div>
                    <InputText
                        name="instagram"
                        :attributes="{ readonly: !editMode }"
                    />
                    <InputText
                        name="whatsapp_number"
                        :attributes="{ readonly: !editMode }"
                    />
                    <InputText
                        name="phone"
                        :attributes="{ readonly: !editMode }"
                    />
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
</template>

<style scoped>

</style>