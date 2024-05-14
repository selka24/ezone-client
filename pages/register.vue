<script setup lang="ts">
import RegisterForm from "~/components/auth/RegisterForm.vue";

const authStore = useAuthStore();

</script>

<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">{{ authStore.authLoading ?  'Duke u regjistruar' : 'Regjistrohu!' }}</h1>
                <p class="py-6 max-w-2xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <div class="flex justify-center" v-if="authStore.authLoading">
                    <span class="loading loading-bars loading-lg"></span>
                </div>
            </div>
            <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <RegisterForm/>
            </div>
        </div>
        <div class="toast toast-top toast-end">
            <div class="alert alert-info">
                <span>New mail arrived.</span>
            </div>
            <div class="alert alert-success">
                <span>Message sent successfully.</span>
            </div>
        </div>
    </div>
</template>
