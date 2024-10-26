<script setup lang="ts">
const employeeStore = useEmployeeStore();
const staffTableColumns: {title: string, key: string}[] = [
    {title: 'Name', key: 'name'},
    {title: 'Services', key: 'services'},
]

const {$Swal, $apiService, $toast} = useNuxtApp();

const allEmployees = computed(() => employeeStore.allEmployees);

employeeStore.actGetAllEmployees();

const handleDelete = (staff: Employee) => {
    $Swal.fire({
        title: `Do you want to delete ${staff.name} ${staff.lastname}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                await $apiService.delete(`/employee/${staff._id}`);
                await employeeStore.actGetAllEmployees();
                return 'isDeleted';
            } catch (e) {
                return false;
            }
        }
    }).then(({value}) => {
        if(value === 'isDeleted'){
            $toast.success(`${staff.name} ${staff.lastname} is deleted`);
        }
    })
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th v-for="{title, key} in staffTableColumns" :key="`th-${key}`">
                    {{ title }}
                </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr v-for="staff in allEmployees">
                <td>
                    <div class="flex items-center gap-3">
                        <div class="mask mask-squircle w-12 h-12 !flex items-center justify-center justify-center">
                            <fai icon="user" class="text-[2rem] text-white"/>
                        </div>
                        <div>
                            <div class="font-bold">{{ staff.name }} {{staff.lastname}}</div>
                            <div class="text-sm opacity-50">{{ staff.job_title }}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="flex items-center gap-3 flex-wrap">
                        <div class="badge badge-light"
                             v-for="service in staff.services"
                             :key="`service-${staff._id}-${service._id}`">
                            {{service.title}}
                        </div>
                    </div>
                </td>
                <th>
                    <button class="btn btn-ghost btn-xs" @click="$emit('viewEmployee', staff)">
                        <fai icon="eye"/>
                    </button>
                    <button class="btn btn-ghost btn-xs" @click="handleDelete(staff)">
                        <fai icon="trash"/>
                    </button>
                </th>
            </tr>
            </tbody>
            <!-- foot -->
<!--            <tfoot>-->
<!--            <tr>-->
<!--                <th></th>-->
<!--                <th v-for="{title, key} in staffTableColumns" :key="`tf-${key}`">{{ title }}</th>-->
<!--                <th></th>-->
<!--            </tr>-->
<!--            </tfoot>-->

        </table>
    </div>
</template>

<style scoped>

</style>
