<script setup lang="ts">
import { useForm } from 'vee-validate';
// import * as yup from 'yup';
import {registerValidationSchema} from "~/validations";

const authStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm<AuthRegister>({
    validationSchema: registerValidationSchema,
});

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const onSubmit = handleSubmit(values => {
    authStore.registerUser(values)
});

const [email] = defineField('email');
const [password] = defineField('password');
const [username] = defineField('username');
const [role] = defineField('role');

const roleOptions: string[] = [
    'admin',
]
</script>

<template>
    <form @submit="onSubmit" class="card-body" novalidate>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Email</span>
            </div>
            <input type="email" v-model="email" class="input input-bordered"/>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
            </div>
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Username</span>
            </div>
            <input type="text" v-model="username" class="input input-bordered"/>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.username }}</span>
            </div>
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <input type="password" v-model="password" class="input input-bordered"/>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.password }}</span>
            </div>
        </label>
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
        <button :disabled="authStore.authLoading" class="btn btn-primary">Submit</button>
    </form>
</template>
