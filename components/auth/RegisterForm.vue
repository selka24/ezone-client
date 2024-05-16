<script setup lang="ts">
import { useForm } from 'vee-validate';
// import * as yup from 'yup';
import {registerValidationSchema} from "~/validations";
import InputText from "~/components/inputs/InputText.vue";

const authStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm<AuthRegister>({
    validationSchema: registerValidationSchema,
});

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const onSubmit = handleSubmit(values => {
    console.log(values)
    // authStore.registerUser(values)
});

// const [email] = defineField('email');
// const [password] = defineField('password');
// const [username] = defineField('username');
const [role] = defineField('role');

const roleOptions: string[] = [
    'admin',
]
</script>

<template>
    <form @submit.prevent="onSubmit" class="card-body" novalidate>
        <InputText name="email" :attributes="{type: 'email'}" />
        <InputText name="username" />
        <InputText name="password" :attributes="{type: 'password'}" />
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Select user role</span>
            </div>
            <select v-model="role" class="select select-bordered capitalize">
                <option disabled>Select Role</option>
                <option v-for="opt in roleOptions" class="capitalize">{{ opt }}</option>
            </select>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.role }}</span>
            </div>
        </label>
        <button :disabled="authStore.authLoading" class="btn btn-primary">Register</button>

        <div>Already have an account? <nuxt-link to="/login" class="link link-primary">Login</nuxt-link></div>

    </form>
</template>
