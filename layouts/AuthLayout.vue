<script setup lang="ts">
const authStore = useAuthStore();
const route = useRoute();

const loadingMessage = computed(() => {
    if (route.path === '/register'){
        return {loading: 'Duke u regjistruar', steady: 'Regjistrohu'}
    }
    return {loading: 'Duke u loguar', steady: 'Logohu'}
})

</script>

<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">
                    {{ authStore.authLoading ?  loadingMessage.loading : loadingMessage.steady }}
                </h1>
                <p class="py-6 max-w-2xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <div class="flex justify-center" v-if="authStore.authLoading">
                    <span class="loading loading-bars loading-lg"></span>
                </div>
            </div>
            <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
