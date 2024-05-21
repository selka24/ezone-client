<script setup lang="ts">
import Header from "~/components/header/Header.vue";

const authStore = useAuthStore();
const hasCompany = computed(() => {
    return !!authStore.authUser?.companyProfileId
})

</script>

<template>
    <div>
        <AdminSidebar v-if="hasCompany"/>
        <div :class="['flex flex-col items-center pr-8 lg:pr-10', {'ml-48': hasCompany}]">
            <Header/>
            <div class="w-full mt-5">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
