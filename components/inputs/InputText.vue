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
    <fieldset class="fieldset">
        <label v-if="!noFormLabel" :for="name" class="label capitalize">
            {{ name }}
        </label>
        <input v-model="value"
               :id="name"
               :class="['input', {'input-disabled': attributes?.readonly}]"
               v-bind="attributes"/>
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </fieldset>
</template>
