<script setup lang="ts">
import { useForm } from 'vee-validate';
// import * as yup from 'yup';
import {registerValidationSchema} from "~/validations";
import InputText from "~/components/inputs/InputText.vue";
import type {AuthRegister} from "~/interfaces/main-types";


const authStore = useAuthStore();

const { errors, handleSubmit, defineField, values } = useForm<AuthRegister>({
    validationSchema: registerValidationSchema,
    initialValues: {
        role: 'admin',
        username: 'admin',
    }
});

// Creates a submission handler
// It validates all fields and doesn't call your function unless all fields are valid
const onSubmit = handleSubmit(values => {
    console.log(values)
    values.username = values.email.split('@')[0];
    authStore.registerUser(values);
});

// const [role] = defineField('role');
//
// const roleOptions: string[] = [
//     'admin',
// ]
</script>

<template>
    <form @submit.prevent="onSubmit" class="card-body" novalidate autocomplete="off">
        <InputText name="email" :attributes="{type: 'email', name: 'email'}" />
<!--        <InputText name="username" :attributes="{}"/>-->
        <InputText name="password" :attributes="{type: 'password'}" />
<!--        <label class="fieldset max-w-xs">-->
<!--            <div class="label">-->
<!--                <span class="label-text">Select user role</span>-->
<!--            </div>-->
<!--            <select v-model="role" class="select capitalize">-->
<!--                <option disabled>Select Role</option>-->
<!--                <option v-for="opt in roleOptions" class="capitalize">{{ opt }}</option>-->
<!--            </select>-->
<!--            <div class="label">-->
<!--                <span class="label-text-alt text-error">{{ errors.role }}</span>-->
<!--            </div>-->
<!--        </label>-->
        <button :disabled="authStore.authLoading" class="btn btn-primary">Register</button>

        <div>Already have an account? <nuxt-link to="/login" class="link link-primary">Login</nuxt-link></div>
    </form>
</template>
