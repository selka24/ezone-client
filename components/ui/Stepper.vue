<script setup lang="ts">
interface Step {
    title: string
}

const emit = defineEmits(['stepChange'])

const props = withDefaults(defineProps<{
    steps?: Step[],
    currStep?: number
}>(), {
    steps: () => [
        {title: 'Register'},
        {title: 'Choose plan'},
        {title: 'Purchase'},
        {title: 'Receive Product'},
    ],
    currStep: 0
})

const handleStepClick = (step: Step, idx: number) => {
    if(idx < props.currStep) emit('stepChange', step)
}
</script>

<template>
    <ul class="steps">
        <li v-for="(step, idx) in steps" @click="handleStepClick(step, idx)" :class="['step', {'step-primary': idx <= currStep}]">
            {{ step.title }}
        </li>
    </ul>
</template>

<style scoped>

</style>
