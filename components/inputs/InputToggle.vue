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
    <fieldset class="fieldset">
        <label class="cursor-pointer label">
            <input type="checkbox" v-model="value" class="toggle toggle-primary" />
            <span class="ml-2">{{label || name}}</span>
        </label>
        <div class="label text-error" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </fieldset>
</template>
