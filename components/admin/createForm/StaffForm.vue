<script setup lang="ts">
import type {Employee} from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";

const {} = useForm<Employee>({
    validationSchema: employeeValidationSchema
})
</script>

<template>
    <form novalidate>

    </form>
</template>

<style scoped>

</style>
