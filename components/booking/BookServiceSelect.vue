<script setup lang="ts">
import ServiceStat from "~/components/admin/services/ServiceStat.vue";
import type {Service} from "~/interfaces/main-types";

const props = defineProps<{
   name: string,
   services: Service[]
}>()

const {value, errorMessage} = useField<string>(() => props.name);

const handleServiceSelect = (service: Service) => {
    console.log('serviceeee', service)
    if(service._id){
        if(value.value === service._id){
            value.value = ''
        } else {
            value.value = service._id;
        }
    }
}
</script>

<template>
    <div>
        <service-stat v-for="s in services"
                      @click="handleServiceSelect(s)"
                      :class="['border border-neutral cursor-pointer',  {'!border-primary': value === s._id}]"
                      :service="s"/>
    </div>
</template>

<style scoped>

</style>
