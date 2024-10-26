<script setup lang="ts">
import StaffTable from "~/components/admin/staff/StaffTable.vue";
// import StaffDefaultForm from "~/components/inputs/StaffDefaultForm.vue";
import type {Employee} from "~/interfaces/main-types";
const StaffDefaultForm = defineAsyncComponent(() => import('~/components/inputs/StaffDefaultForm.vue'))
// const companyStore = useCompanyStore();
const employeeStore = useEmployeeStore();
const staffModal = ref<any>(null);
const showModal = ref(false);
const editEmployee = ref<Employee | undefined>()

const handleEmployeeCreate = async (employee: Employee) => {
    console.log(employee)
    if (employee._id){
        await employeeStore.actUpdateEmployee(employee);
    } else {
        await employeeStore.actCreateEmployee(employee);
    }
    showModal.value = false;
    nextTick(() => {
        employeeStore.actGetAllEmployees();
    })
}

const handleModalOpen = (e?: Employee) => {
    editEmployee.value = e;
    showModal.value = true;
    nextTick(() => {
        staffModal.value?.showModal();
    })
}

const handleEditEmployee = (e: Employee) => {
    handleModalOpen(e);
}

</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-end mb-8">

            <div class="prose">
                <h2>My Staff</h2>
                <p>Menaxho stafin, shto pjesetare te rinj</p>
            </div>
            <!-- You can open the modal using ID.showModal() method -->
            <button class="btn btn-primary ml-auto" @click="handleModalOpen(undefined)">
                <fai icon="plus"/>
                Add Staff
            </button>
            <dialog v-if="showModal" id="staffModal" ref="staffModal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button @click="() => showModal = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-6">✕</button>
                    </form>
                    <h3 class="font-bold text-lg px-1">{{ editEmployee ? 'Edit Staff' : 'Add New Staff' }}</h3>
                    <StaffDefaultForm
                        class="grid grid-cols-2 modalForm"
                        :edit-employee="editEmployee"
                        @employeeSubmit="handleEmployeeCreate"
                    />
                </div>
            </dialog>
        </div>
        <staff-table @viewEmployee="handleEditEmployee"/>
    </div>
</template>

<style lang="postcss">
.modalForm > * {
    @apply col-span-2 !important;
}
</style>
