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
        <label class="label cursor-pointer capitalize">
            {{label || name}}
            <input type="checkbox" v-model="value" class="checkbox checkbox-primary" />
        </label>
        <div class="label text-error">
            {{ errorMessage }}
        </div>
    </fieldset>
</template>
