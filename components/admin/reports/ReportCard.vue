<script setup lang="ts">

</script>

<template>
    <div class="card bg-base-300 shadow-xl">
        <div class="card-body">
            <div class="card-title justify-between">
                <h2>
                    <slot name="title"></slot>
                </h2>
                <slot name="actions">
                </slot>
            </div>
        </div>
        <client-only>
            <slot></slot>
        </client-only>
    </div>
</template>

<style scoped>

</style>