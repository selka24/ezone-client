import {defineStore, acceptHMRUpdate} from 'pinia';
import type {Company, CreateCompany} from "~/interfaces/main-types";

export const useCompanyStore = defineStore('companyStore', () => {
    const {$api} = useNuxtApp();
    const authStore = useAuthStore();

    const abortController = new AbortController();

    //state
    const creatingCompany = ref(false);
    const {data: company, refresh, pending, status} = useApi<Company | null>(() => `/company/${authStore.authUser?.companyProfileId}`, {
        method: 'GET',
        lazy: true,
        immediate: false,
        default: () => null,
        signal: abortController.signal,
        // onRequest(){
        //     console.log('aaasdasdddsss')
        // },
        // onResponse(){
        //     console.log('response aaasdasdddsss')
        // }
        // onResponseError(){
        //     console.log(authStore.authUser, 'aaaaaaaa')
        //     console.log('errrorrr')
        //     company.value = null;
        // }
    }, {noToast: true})

    watch(() => authStore.authUser, (newVal) => {
        if(!newVal?.companyProfileId){
            abortController.abort('Cant fetch company without ID');
        }
    })


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
        pending,
        actCreateCompany,
        status,
        actGetMyCompany,
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))
}
