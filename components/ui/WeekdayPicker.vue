<script setup lang="ts">
import {Days} from "~/interfaces/main-types";

const props = defineProps<{
    modelValue: Days[]
}>();

const emit = defineEmits<{
    "update:modelValue": [Days[]]
}>()

const daysArray = Object.values(Days).map((day) => {
    return {
        day: day,
        short: day[0]
    }
});

const handleDayChange = (e: Event) => {
    console.log(e.target)
    const target = e.target as HTMLInputElement;
    const value = target.value as Days;
    const checked = target.checked;
    console.log(value, checked);
    if(checked) {
        emit("update:modelValue", [...props.modelValue, value]);
    } else {
        emit("update:modelValue", props.modelValue.filter((v) => v !== value));
    }
    console.log(props.modelValue);
}

const isDaySelected = (day: Days) => {
    return props.modelValue.includes(day);
}
</script>

<template>
    <div class="flex align-items-center gap-5">
        <label v-for="({day, short}) in daysArray"
               :class="['badge badge-lg uppercase cursor-pointer', {'badge-primary': isDaySelected(day)}]"
               :key="day">
            <input type="checkbox"
                   :id="day"
                   :checked="isDaySelected(day)"
                   @change="handleDayChange"
                   :value="day">
            {{short}}
        </label>
    </div>
</template>

<style scoped>

</style>
