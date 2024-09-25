5<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";
import StaffAvatar from "~/components/admin/staff/StaffAvatar.vue";
import StaffDefaultForm from "~/components/inputs/StaffDefaultForm.vue";

const emit = defineEmits<{
    employeesSubmit: [Employee],
    continue: [Employee[]]
}>()

const employees = ref<Employee[]>([]);

const handleEmployeeSubmit = (employee: Employee) => {
    console.log(employee, 'eeeeeeeeee')
    emit('employeesSubmit', employee);
    employees.value.push(employee)
}

const handleContinue = () => {
    emit('continue', employees.value);
}
</script>

<template>
    <div class="card-body">
        <StaffDefaultForm @employeeSubmit="handleEmployeeSubmit" />
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
