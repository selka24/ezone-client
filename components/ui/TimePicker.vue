<template>
    <label ref="timePicker" class="form-control w-full relative">
        <div class="label">
            <span class="label-text capitalize">{{ label || 'Duration' }}</span>
        </div>
        <input :value="inputValue"
               readonly
               @click="handleToggle"
               class="input input-bordered text-center" type="text"/>
        <div class="label" v-if="errorMessage">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>

        <div v-show="selectState" class="flex absolute z-10 mt-1 top-[85px] max-h-56 w-full rounded-md bg-base-100 py-1 shadow-lg">
            <div class="overflow-y-scroll no-scrollbar w-full text-center">
                <div v-for="hour in hours" :key="hour + 'h'"
                     @click="handleTimeChange(hour, 0)"
                     :class="[currHours === hour ? 'font-semibold text-primary' : 'font-normal', 'relative cursor-pointer select-none py-2 hover:bg-primary hover:text-primary-content']">
                            {{ addZero(hour) }}
                </div>
            </div>
            <div class="divider divider-horizontal divider-neutral m-0"></div>
            <div  class="overflow-y-scroll no-scrollbar w-full text-center">
                <div v-for="minute in minutes"
                     @click="handleTimeChange(minute, 1)"
                     :key="minute + 'm'"
                     :class="[currMinutes === minute ? 'font-semibold text-primary' : 'font-normal', 'relative cursor-pointer select-none py-2 hover:bg-primary hover:text-primary-content']">
                            {{ addZero(minute) }}
                </div>
            </div>
        </div>
    </label>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<{
    modelValue: number,
    label?: string,
    errorMessage?: string,
    hours?: number[],
    minutes?: number[]
}>(), {
    hours: () => [...Array(4).keys()],
    minutes:  () => [0, 15, 30, 45]
})
const timePicker = ref(null);
const selectState = ref(false);
const handleClickOutside = () => selectState.value = false;

onClickOutside(timePicker, handleClickOutside)

const addZero = (num: number) => {
    const stringNum = `${num}`
    if(stringNum.length === 1)
        return `0${stringNum}`;
    return stringNum;
}

// const hours = [...Array(4).keys()];
// const minutes = [0, 15, 30, 45] //[...Array(12).keys()].map(x => x*5);

const currHours = computed(() => {
    return Math.floor(props.modelValue/60);
})

const currMinutes = computed(() => {
    return props.modelValue % 60
})

const inputValue = computed(() => {
    return `${addZero(currHours.value) || '00'} : ${addZero(currMinutes.value) || '00'}`
})

const handleTimeChange = (value: number, idx: number) => {
    let totalMinutes = 0;
    if(idx){ //if its minutes
        totalMinutes = (currHours.value * 60) + Number(value);
    } else { //if its hours
        totalMinutes = (Number(value) * 60) + currMinutes.value;
    }
    emit('update:modelValue', totalMinutes);
}

const handleToggle = () => {
    selectState.value = !selectState.value
}
</script>
