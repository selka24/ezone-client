<template>
    <label ref="timePicker" class="form-control w-full relative">
        <div class="label">
            <span class="label-text capitalize">Duration</span>
        </div>
        <input :value="`${timeParts[0] || '00'} : ${timeParts[1] || '00'}`"
               @focus="handleToggle"
               class="input input-bordered" type="text"/>
<!--        <div class="label">-->
<!--            <span class="label-text-alt text-error">{{ errorMessage }}</span>-->
<!--        </div>-->

        <div v-show="selectState" class="flex absolute z-10 mt-1 top-[85px] max-h-56 w-full rounded-md bg-base-100 py-1 shadow-lg">
            <div class="overflow-y-scroll no-scrollbar border-r border-neutral">
                <div v-for="hour in hours" :key="hour + 'h'"
                     @click="handleTimeChange(hour, 0)"
                     class="relative cursor-pointer select-none py-2 px-3 hover:bg-primary hover:text-primary-content">
                    <div class="items-center">
                        <span :class="[timeParts.hour === hour ? 'font-semibold' : 'font-normal', 'block']">
                            {{ hour }}
                        </span>
                    </div>
                </div>
            </div>
            <div  class="overflow-y-scroll no-scrollbar">
                <div v-for="minute in minutes"
                     @click="handleTimeChange(minute, 1)"
                     :key="minute + 'm'"
                     class="relative cursor-pointer select-none py-2 px-3 hover:bg-primary hover:text-primary-content">
                    <div class="items-center">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span :class="[timeParts.minute === minute ? 'font-semibold' : 'font-normal', 'block']">
                            {{ minute }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </label>
<!--    <div>-->
<!--        <div ref="timePicker" class="relative mt-2">-->
<!--            <button @click="handleToggle" type="button" class="relative w-full cursor-default btn btn-base-100 text-left">-->
<!--                <span :class="[{'text-gray-400': timeParts[0] === '00' && timeParts[1] === '00'}, 'flex justify-between items-center']">-->
<!--                    <span>{{timeParts[0] || '00'}}</span>-->
<!--                    <span>:</span>-->
<!--                    <span>{{timeParts[1] || '00'}}</span>-->
<!--                </span>-->
<!--            </button>-->
<!--            <div v-show="selectState" class="flex absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">-->
<!--                <div class="overflow-y-scroll no-scrollbar border-r">-->
<!--                    <div v-for="hour in hours" :key="hour + 'h'" @click="handleTimeChange(hour, 0)" class="cursor-pointer text-gray-900 relative cursor-default select-none py-2 pl-5 pr-3 hover:text-blue-500" id="listbox-option-0" role="option">-->
<!--                        <div class="items-center">-->
<!--                            <span :class="[timeParts.hour === hour ? 'font-semibold' : 'font-normal', 'block']">{{ hour }}</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div  class="overflow-y-scroll no-scrollbar">-->
<!--                    <div v-for="minute in minutes" :key="minute + 'm'" class="text-gray-900 relative cursor-default select-none py-2 pr-5 pl-2 hover:text-blue-500" id="listbox-option-0" role="option">-->
<!--                        <div @click="handleTimeChange(minute, 1)" class="cursor-pointer items-center">-->
<!--                            &lt;!&ndash; Selected: "font-semibold", Not Selected: "font-normal" &ndash;&gt;-->
<!--                            <span :class="[timeParts.minute === minute ? 'font-semibold' : 'font-normal', 'block']">{{ minute }}</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>
<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps(['modelValue'])
const timePicker = ref(null);
const selectState = ref(false);
const handleClickOutside = () => selectState.value = false;

onClickOutside(timePicker, handleClickOutside)

const addZero = (num) => {
    num = `${num}`
    if(num.length === 1)
        return `0${num}`;
    return num;
}
const hours = [...Array(6).keys()].map(x => addZero(x));
const minutes = [...Array(12).keys()].map(x => addZero(x*5));


const timeParts = computed(() => {
    return props.modelValue.split(':');
})


const handleTimeChange = (value, idx) => {
    console.log(timeParts.value, 'timePArts')
    const newValue = timeParts.value.toSpliced(idx, 1, value).join(':');
    emit('update:modelValue', newValue);
}

const handleToggle = () => {
    selectState.value = !selectState.value
}
</script>
