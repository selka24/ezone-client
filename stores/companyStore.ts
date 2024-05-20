import {defineStore, acceptHMRUpdate} from 'pinia';
import type {Company, CreateCompany} from "~/interfaces/main-types";

export const useCompanyStore = defineStore('companyStore', () => {
    const {$api} = useNuxtApp();
    const authStore = useAuthStore();

    //state
    // const company = ref<Company | null>(null);
    const creatingCompany = ref(false);
    const {data: company, refresh} = useApi<Company | null>(`/company/${authStore.authUser?.companyProfileId}`, {
        method: 'GET',
        default: () => null
    }, {noToast: true})


    //actions
    const actCreateCompany = async (companyInfo: CreateCompany) => {
        try {
            creatingCompany.value = true;
            const dataCR = await $api<Company>('/profile/create', {
                method: 'POST',
                body: companyInfo
            })
            console.log(dataCR, 'company data')
            company.value = dataCR;
        } catch (e) {

        } finally {
            creatingCompany.value = false;
        }
    }

    const actGetMyCompany = async () => {
        try {
            await refresh();
            // company.value = await $api<Company>(`/company/${authStore.authUser?.companyProfileId}`, { method: 'GET' });
        } catch (e) {

        }
    }

    return {
        company,
        creatingCompany,
        actCreateCompany,
        actGetMyCompany
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))
}
