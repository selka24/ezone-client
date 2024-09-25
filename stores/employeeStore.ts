import {defineStore, acceptHMRUpdate} from 'pinia';

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

    return {
        allEmployees,
        actGetAllEmployees,
    }
})
