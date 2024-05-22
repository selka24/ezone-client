<script setup lang="ts">
import { useField } from 'vee-validate';
import TimePicker from "~/components/ui/TimePicker.vue";
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    attributes: {
        type: Object,
        default: () => {}
    }
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
<template>
   <TimePicker v-model="value" v-bind="attributes" :error-message="errorMessage"/>
</template>
