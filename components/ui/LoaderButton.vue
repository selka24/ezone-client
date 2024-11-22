<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button class="btn">
        <span v-if="loading" class="loading loading-spinner loading-xs"></span>
        <div v-show="!loading">
            <slot>
            </slot>
        </div>
    </button>
</template>

<style scoped>

</style>