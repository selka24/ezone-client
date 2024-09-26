<template>
  <div>
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const companyStore = useCompanyStore();
import {testValidation} from '~/validations'

testValidation();

if(authStore.authenticated){
    console.log('getting')
    // companyStore.actGetMyCompany();
}
</script>
<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
