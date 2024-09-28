<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    noFormLabel: {
        type: Boolean,
        default: false
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
//
// onMounted(() => {
//     if (props.attributes.value)
//         value.value = props.attributes.value
// })
</script>
<template>
    <label class="form-control w-full">
        <div v-if="!noFormLabel" class="label">
            <span class="label-text capitalize">{{ name }}</span>
        </div>
        <input v-model="value"
               class="input input-bordered"
               v-bind="attributes"/>
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </label>
</template>
