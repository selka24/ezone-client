<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";

const employees = ref<Employee[]>([]);
const {handleSubmit, resetForm} = useForm<Employee>({
    validationSchema: employeeValidationSchema
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    employees.value.push(employee)
})
</script>

<template>
    <div class="card-body">
        <form @submit.prevent="handleEmployeeSubmit" novalidate>

        </form>
    </div>
</template>

<style scoped>

</style>
