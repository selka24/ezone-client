5<script setup lang="ts">
import type {Employee, Service} from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";
import StaffAvatar from "~/components/admin/staff/StaffAvatar.vue";
import InputText from "~/components/inputs/InputText.vue";
import InputSelect from "~/components/inputs/InputSelect.vue";
const authStore = useAuthStore();
const props = defineProps<{
    services: Service[],
    companyId: string,
}>();
const emit = defineEmits<{
    employeesSubmit: [Employee],
    continue: [Employee[]]
}>()

const employees = ref<Employee[]>([]);
const {handleSubmit, resetForm} = useForm<Employee>({
    validationSchema: employeeValidationSchema,
    initialValues: {
        company: props.companyId
    }
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    console.log(employee, 'eeeeeeeeee')
    emit('employeesSubmit', employee);
    employees.value.push(employee)
    resetForm();
})

const handleContinue = () => {
    emit('continue', employees.value);
}
</script>

<template>
    <div class="card-body">
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
            <div class="col-span-2">
                <button type="submit" class="btn btn-primary mt-9 w-full">
                    <fai icon="plus"/>
                    Add
                </button>
            </div>
        </form>
        <div class="divider divider-neutral"></div>
        <div class="flex">
            <StaffAvatar v-for="staff in employees" :staff="staff"/>
        </div>
        <button class="btn btn-primary mt-10"
                @click="handleContinue"
                :disabled="employees.length === 0">
            Krijo
        </button>
    </div>
</template>

<style scoped>

</style>
