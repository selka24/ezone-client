<script setup lang="ts">
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import type {Service} from "~/interfaces/main-types";

const props = defineProps<{
   name: string,
   services: Service[]
}>()

const {value, errorMessage} = useField<string>(() => props.name);

const handleServiceSelect = (service: Service) => {
    if(service.id){
        value.value = service.id;
    }
}
</script>

<template>
    <div>
        <service-stat @click="handleServiceSelect(s)" v-for="s in services" :service="s"/>
    </div>
</template>

<style scoped>

</style>
