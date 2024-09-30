<script setup lang="ts">
import StaffTable from "~/components/admin/staff/StaffTable.vue";
// import StaffForm from "~/components/admin/createForm/StaffForm.vue";
import StaffDefaultForm from "~/components/inputs/StaffDefaultForm.vue";
import type {Employee} from "~/interfaces/main-types";
import moment from "moment";
// import WeekdayPicker from "~/components/ui/WeekdayPicker.vue";

const companyStore = useCompanyStore();
const employeeStore = useEmployeeStore();

const handleEmployeeCreate = (employee: Employee) => {
    employeeStore.actCreateEmployee({
            ...employee,
            working_days: employee.working_days.map(({day, start_time, end_time}) => {
                return {
                    day,
                    start_time:  moment().startOf('day').add(start_time, 'minutes').valueOf(),
                    end_time:  moment().startOf('day').add(end_time, 'minutes').valueOf(),
                }
            })
        }
    )
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
                    <StaffDefaultForm class="grid grid-cols-2 modalForm" @employeeSubmit="handleEmployeeCreate"/>
                </div>
            </dialog>
        </div>
        <staff-table />
    </div>
</template>

<style lang="postcss">
.modalForm > * {
    @apply col-span-2 !important;
}
</style>
