<script setup lang="ts">
import {companyValidationSchema} from '~/validations';
import InputText from "~/components/inputs/InputText.vue";
import InputToggle from "~/components/inputs/InputToggle.vue";
import Stepper from "~/components/ui/Stepper.vue";
import MainInfoForm from "~/components/admin/createForm/MainInfoForm.vue";
import type {Company, CompanyMainInfo, CreateCompany, Service} from "~/interfaces/main-types";
import ServicesForm from "~/components/admin/createForm/ServicesForm.vue";
import StaffForm from "~/components/admin/createForm/StaffForm.vue";
const authStore = useAuthStore();
const companyStore = useCompanyStore();

const steps = [{title: 'Main Info'},{title: 'Add Services'},{title: 'Add Staff'}];
const currStep = ref(0)

const company = ref<CreateCompany | {}>({})
const companyServices = ref<Service[]>([])
// const {handleSubmit, errors} = useForm<Company>({
//     validationSchema: companyValidationSchema
// })

const handleCompanyServices = (values: Service[]) => {
    companyServices.value = values;
    currStep.value++;
}

const handleNextStep = (values: CompanyMainInfo) => {
    company.value = {...company.value, ...values};
    if(currStep.value === 2){

    } else {
        currStep.value++
    }

    console.log(company.value)
}

// const handleCreateCompany = handleSubmit((values) => {
//     console.log('create company values', values);
//     companyStore.actCreateCompany({...values, user: authStore.authenticated})
// })
</script>

<template>
    <div class="flex flex-col items-center gap-10">
        <Stepper :steps="steps" :curr-step="currStep" class="max-w-screen-md w-full"/>

        <div class="card shrink-0 w-full max-w-screen-sm shadow-2xl bg-base-100">
            <transition-group name="page">
                <MainInfoForm v-show="currStep === 0" @form-submit="handleNextStep" :key="0"/>
                <ServicesForm v-show="currStep === 1" @services-submit="handleCompanyServices" :key="1"/>
                <StaffForm v-show="currStep === 2" :key="2" :services="companyServices"/>
            </transition-group>
            <span v-show="companyStore.creatingCompany" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-bars loading-lg"></span>
        </div>
    </div>
</template>
