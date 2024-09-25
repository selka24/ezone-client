<script setup lang="ts">
import StaffTable from "~/components/admin/staff/StaffTable.vue";
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-end mb-8">

            <div class="prose">
                <h2>My Staff</h2>
                <p>Menaxho stafin, shto pjesetare te rinj</p>
            </div>
            <!-- You can open the modal using ID.showModal() method -->
            <button class="btn btn-primary ml-auto" onclick="my_modal_3.showModal()">
                <fai icon="plus"/>
                Add Staff
            </button>
            <dialog id="my_modal_3" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 class="font-bold text-lg">Hello!</h3>
                    <p class="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
        <staff-table />
    </div>
</template>

<style scoped>

</style>
