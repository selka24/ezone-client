<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
    <div>
        <AdminSidebar/>
        <div class="flex flex-col items-center ml-48 pr-8 lg:pr-10">
            <ul class="menu menu-horizontal ml-auto bg-base-200 rounded-box mt-5">
                <li>
                    <nuxt-link to="/admin" class="tooltip" data-tip="Home">
                        <fai icon="home"/>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/admin" class="tooltip" data-tip="Details">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </nuxt-link>
                </li>
                <li>
                    <a @click.prevent="authStore.actLogOut" class="tooltip" data-tip="Log Out">
                        <fai icon="right-from-bracket" />
                    </a>
                </li>
            </ul>
            <div class="w-full mt-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
