<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: [number, number]
    workingHours?: [number, number],
    minutesInterval?: number
}>(), {
    workingHours: () => [10, 23],
    minutesInterval: 15
})

const emit = defineEmits<{
    'update:modelValue': [[number, number]]
}>()

const {addZero} = useUtils();

const hours = computed(() => {
    const [min, max] = props.workingHours;
    const hoursArray = []
    for(let x = min; x < max; x++ ) {
        hoursArray.push(x);
    }
    return hoursArray
})

const minutes = computed(() => {
    const minutesArray=  []
    for(let x = 0; x < 60; x+=props.minutesInterval){
        minutesArray.push(x)
    }
    return minutesArray;
})

const handleTimeChange = (value: number, type: number) => {
    if(type === 0){ //is setting hour
        emit('update:modelValue', [value, props.modelValue[1]]);
    } else { //is setting minutes
        emit('update:modelValue', [props.modelValue[0], value]);
    }
}
</script>

<template>
    <div class="overflow-y-scroll no-scrollbar w-full text-center">
        <div v-for="hour in hours" :key="hour + 'h'"
             @click="handleTimeChange(hour, 0)"
             :class="[modelValue[0] === hour ? 'font-semibold text-primary' : 'font-normal', 'relative cursor-pointer select-none py-2 hover:bg-primary hover:text-primary-content']">
            {{ addZero(hour) }}
        </div>
    </div>
    <div class="divider divider-horizontal divider-neutral m-0"></div>
    <div  class="overflow-y-scroll no-scrollbar w-full text-center">
        <div v-for="minute in minutes"
             @click="handleTimeChange(minute, 1)"
             :key="minute + 'm'"
             :class="[modelValue[1] === minute ? 'font-semibold text-primary' : 'font-normal', 'relative cursor-pointer select-none py-2 hover:bg-primary hover:text-primary-content']">
            {{ addZero(minute) }}
        </div>
    </div>
</template>

<style scoped>

</style>
