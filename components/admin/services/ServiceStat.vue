<script setup lang="ts">
import type {Service} from "~/interfaces/main-types";
import Stat from "~/components/ui/Stat.vue";

const {displayDuration} = useUtils()
const props = defineProps<{service: Service }>();

const statProps = computed(() => {
    return {
        title: props.service.title || '',
        value: `ALL ${props.service.price}`,
        desc: `Kohëzgjatja: ${displayDuration(props.service.duration)}`
    }
})
</script>

<template>
    <Stat v-bind="statProps"/>
</template>

<style scoped>

</style>
