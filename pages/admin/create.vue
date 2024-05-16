<script setup lang="ts">
import {companyValidationSchema} from '~/validations';
import InputText from "~/components/inputs/InputText.vue";
import InputCheckbox from "~/components/inputs/InputCheckbox.vue";

const authStore = useAuthStore();
const companyStore = useCompanyStore();

const {handleSubmit, errors} = useForm<Company>({
    validationSchema: companyValidationSchema
})

const handleCreateCompany = handleSubmit((values) => {
    console.log('create company values', values);
    companyStore.actCreateCompany({...values, user: authStore.authenticated})
})
</script>

<template>
    <div class="card m-auto mt-20 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        {{errors}}
        <form @submit.prevent="handleCreateCompany" class="card-body" novalidate>
            <h2 class="card-title">Create company</h2>
            <InputText name="name" />
            <InputText name="description" />
            <InputCheckbox name="show_price" label="Show Price" />
            <InputText name="location" />

            <button :disabled="companyStore.creatingCompany" class="btn btn-primary">Create</button>
        </form>
        <span v-show="companyStore.creatingCompany" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-bars loading-lg"></span>
    </div>
</template>
