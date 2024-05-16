<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    attributes: {
        type: Object,
        default: () => {
            return {
                type: 'text'
            }
        }
    }
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
<template>
    <label class="form-control w-full">
        <div class="label">
            <span class="label-text capitalize">{{ name }}</span>
        </div>
        <input v-model="value" class="input input-bordered" v-bind="attributes"/>
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </label>
</template>
