<script setup lang="ts">
import InputToggle from "~/components/inputs/InputToggle.vue";
import InputText from "~/components/inputs/InputText.vue";
import {companyValidationSchema, mainInfoValidationSchema} from "~/validations";

const companyStore = useCompanyStore();
const editMode = ref(false);
const {$toast} = useNuxtApp();

const { handleSubmit } = useForm({
    validationSchema: mainInfoValidationSchema,
    initialValues: companyStore.company
})

const updateCompany = handleSubmit(async(values) => {
    const msg = await companyStore.actUpdateCompany({...values, employees: []});
    if(msg === 'success') {
        $toast.success('Profile updated successfully.');
        editMode.value = false;
    } else {
        $toast.error('Something wrong happened!');
    }
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
                            class="input join-item pr-0"
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
        </form>
</template>

<style scoped>

</style>