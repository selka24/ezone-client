<script setup lang="ts">
import {useField} from "vee-validate";
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
    }
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
    <div class="form-control">
        <label class="cursor-pointer label">
            <input type="checkbox" v-model="value" class="toggle toggle-primary" />
            <span class="label-text ml-2">{{label || name}}</span>
        </label>
        <div class="label" v-if="errorMessage">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>
