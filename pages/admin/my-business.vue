<script setup lang="ts">
const BusinessProfile = defineAsyncComponent(() => import("~/components/admin/business/BusinessProfile.vue"));
const BusinessServices = defineAsyncComponent(() => import("~/components/admin/business/BusinessServices.vue"));
const BusinessSettings = defineAsyncComponent(() => import("~/components/admin/business/BusinessSettings.vue"));

const businessTabs = [
    {title: 'Profile', value: 1},
    {title: 'Services', value: 2},
    {title: 'Settings', value: 3},
]
const currTab = ref(1)


</script>

<template>
    <div>
        <div role="tablist" class="tabs tabs-boxed tabs-lg mb-8 p-2">
            <div
                v-for="tab in businessTabs"
                :key="tab.value"
                @click="currTab = tab.value"
                role="tab"
                :class="['tab', {'tab-active': tab.value === currTab}]"
            >
                {{tab.title }}
            </div>
        </div>
        <transition name="page" mode="out-in" :duration="100">
            <BusinessProfile v-if="currTab === 1"/>
            <BusinessServices v-else-if="currTab === 2"/>
            <BusinessSettings v-else-if="currTab === 3"/>
        </transition>
    </div>
</template>

<style scoped>

</style>
