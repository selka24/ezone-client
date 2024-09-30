import {defineStore, acceptHMRUpdate} from 'pinia';
import type {Employee} from "~/interfaces/main-types";

export const useEmployeeStore = defineStore('employeeStore', () => {
    const {$apiService} = useNuxtApp();
    const allEmployees = ref<Employee[]>();
    const companyStore = useCompanyStore();

    const actGetAllEmployees = async () => {
        try {
            const data: any = await $apiService.get(`/employees/${companyStore.company?._id}`);
            allEmployees.value = data;
        } catch (e) {

        }
    }

    const actCreateEmployee = async (employee: Employee) => {
        $apiService.post('/employee/create', {
            body: employee
        })
    }

    return {
        allEmployees,
        actGetAllEmployees,
        actCreateEmployee,
    }
})
