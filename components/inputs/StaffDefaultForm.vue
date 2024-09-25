<script setup lang="ts">
import InputText from "~/components/inputs/InputText.vue";
import InputSelect from "~/components/inputs/InputSelect.vue";
import type {Employee} from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";
import InputDuration from "~/components/inputs/InputDuration.vue";

const emit = defineEmits<{
    employeeSubmit: [Employee]
}>()

const companyStore = useCompanyStore();

//refactor this
const companyHours = Array.from({ length: 23 - 9 + 1 }, (_, i) => 9 + i);


const companyId = computed(() => companyStore.company?._id || '');
const services = computed(() => companyStore.services);
const time = ref([0,0])

const {handleSubmit, resetForm} = useForm<Employee>({
    validationSchema: employeeValidationSchema,
    initialValues: {
        company: companyId.value
    }
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    emit('employeeSubmit', employee)
})
</script>

<template>
    <form @submit.prevent="handleEmployeeSubmit"
          novalidate
          class="grid grid-cols-6 gap-x-5">
        <InputText name="name" class="col-span-2" :attributes="{placeholder: 'Enter staff name'}"/>
        <InputText name="lastname" class="col-span-2" :attributes="{placeholder: 'Enter staff last name'}"/>
        <InputText name="job_title" class="col-span-2"  :attributes="{placeholder: 'Enter job description'}"/>
        <InputSelect :options="services"
                     :multiple="true"
                     display-key="title"
                     class="col-span-4"
                     :attributes="{placeholder: 'Select services for this staff'}"
                     name="services"/>
        <div class="col-span-full grid grid-cols-2 gap-5">

            <InputDuration class="col-span-1" name="start_time" :attributes="{
               hours: companyHours,
               minutes: [0]
            }"/>
            <InputDuration class="col-span-1" name="end_time" :attributes="{
               hours: companyHours,
               minutes: [0]
            }"/>
        </div>
        <div class="col-span-2">
            <slot name="submitButton">
                <button type="submit" class="btn btn-primary mt-9 w-full">
                    <fai icon="plus"/>
                    Add
                </button>
            </slot>
        </div>
    </form>
</template>

<style scoped>

</style>
