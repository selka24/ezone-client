<script setup lang="ts">
import type {Employee, Service} from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";
import StaffAvatar from "~/components/admin/staff/StaffAvatar.vue";
import InputText from "~/components/inputs/InputText.vue";
import InputSelect from "~/components/inputs/InputSelect.vue";
const props = defineProps<{
    services: Service[]
}>()
const employees = ref<Employee[]>([]);
const {handleSubmit, resetForm} = useForm<Employee>({
    validationSchema: employeeValidationSchema,
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    console.log(employee, 'eeeeeeeeee')
    employees.value.push(employee)
    resetForm();
})
</script>

<template>
    <div class="card-body">
        <form @submit.prevent="handleEmployeeSubmit"
              novalidate
              class="grid grid-cols-6 gap-x-5">
            <InputText name="name" class="col-span-2"/>
            <InputText name="last_name" class="col-span-2"/>
            <InputText name="job_title" class="col-span-2"/>
            <InputSelect :options="services"
                         :multiple="true"
                         display-key="title"
                         class="col-span-4"
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
    </div>
</template>

<style scoped>

</style>
