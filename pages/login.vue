<script setup lang="ts">
import {useForm} from "vee-validate";
import {loginValidationSchema} from "~/validations";
import InputText from "~/components/inputs/InputText.vue";
const authStore = useAuthStore();

const { handleSubmit } = useForm<AuthLogin>({
    validationSchema: loginValidationSchema,
});

const handleLogin = handleSubmit(values => authStore.authenticateUser(values))

definePageMeta({
    layout: 'auth-layout'
})
</script>

<template>
    <form @submit.prevent="handleLogin" class="card-body" novalidate>
        <InputText name="email" :attributes="{type: 'email'}" />
        <InputText name="password" :attributes="{type: 'password'}" />

        <button :disabled="authStore.authLoading" class="btn btn-primary">Login</button>

        <div>Don't have an account? <nuxt-link to="/register" class="link link-primary">Register</nuxt-link></div>
    </form>
</template>

<style scoped>

</style>
