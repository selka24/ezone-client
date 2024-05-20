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
            <span class="label-text">{{label || name}}</span>
            <input type="checkbox" v-model="value" class="toggle toggle-primary" />
        </label>
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>
