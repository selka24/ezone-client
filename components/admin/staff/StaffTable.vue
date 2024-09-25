<script setup lang="ts">
const employeeStore = useEmployeeStore();
const staffTableColumns: {title: string, key: string}[] = [
    {title: 'Name', key: 'name'},
    {title: 'Services', key: 'services'},
]

const allEmployees = computed(() => employeeStore.allEmployees);

employeeStore.actGetAllEmployees();
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th v-for="{title, key} in staffTableColumns" :key="`th-${key}`">
                    {{ title }}
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr v-for="staff in allEmployees">
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>
                    <div class="flex items-center gap-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                            </div>
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
                    <button class="btn btn-ghost btn-xs">details</button>
                </th>
            </tr>
            </tbody>
            <!-- foot -->
            <tfoot>
            <tr>
                <th></th>
                <th v-for="{title, key} in staffTableColumns" :key="`tf-${key}`">{{ title }}</th>
                <th></th>
            </tr>
            </tfoot>

        </table>
    </div>
</template>

<style scoped>

</style>
