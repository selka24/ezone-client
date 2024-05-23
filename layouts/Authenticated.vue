<script setup lang="ts">
import Header from "~/components/header/Header.vue";
const route = useRoute();
const authStore = useAuthStore();
const hasCompany = computed(() => {
    return !!authStore.authUser?.companyProfileId
})

const noSidebar = computed(() => {
    return route.path === '/admin/create'
})

</script>

<template>
    <div>
        <AdminSidebar v-if="hasCompany && !noSidebar"/>
        <div :class="['flex flex-col items-center px-8 lg:px-10', {'ml-48': hasCompany}]">
            <Header/>
            <div class="w-full mt-5">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
