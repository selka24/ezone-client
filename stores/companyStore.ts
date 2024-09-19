import {defineStore, acceptHMRUpdate} from 'pinia';
import type {Company, CreateCompany, Employee, Service} from "~/interfaces/main-types";

export const useCompanyStore = defineStore('companyStore', () => {
    const {$api} = useNuxtApp();
    const authStore = useAuthStore();

    // const abortController = new AbortController();
    const companyProfileId = ref('')

    //state
    const creatingCompany = ref(false);
    const {data: company, refresh, execute, pending, status} = useAsyncData<Company | null>('myCompany',
        () => $api(`/company/${companyProfileId.value}`, {
        method: 'GET',
        // signal: abortController.signal,
    }), {
        immediate: false,
        lazy: true,
        watch: [companyProfileId]
    })

    const services = ref<Service[]>([]);

    const actGetAllService = async () => {
        try {
            services.value = await $api<Service[]>(`/services/company/${companyProfileId.value}`);
        } catch (e) {

        }
    }

    // watch(() => authStore.authUser, (newVal) => {
    //     if(!newVal?.companyProfileId){
    //         console.log('nooooooooooo')
    //         abortController.abort('Cant fetch company without ID');
    //     } else {
    //         console.log(execute)
    //         execute().then((res) => {
    //             console.log(res)
    //             console.log('goooooooooooooooo')
    //         }).catch((e) => {
    //             console.log(e)
    //             console.log('goooooooooooooooo')
    //         });
    //     }
    // })


    //actions
    const actCreateCompany = async (companyInfo: CreateCompany | undefined) => {
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

    const actUpdateCompany = async (companyUpdate: CreateCompany) => {
        try {
            await $api<CreateCompany>(`/company/${companyUpdate._id}`, {
                method: 'PUT',
                body: companyUpdate
            });
            await refresh();
            return 'success';
        } catch (e) {
            return 'error';
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
        services,
        companyProfileId,
        creatingCompany,
        pending,
        actCreateCompany,
        actUpdateCompany,
        status,
        actGetMyCompany,
        actGetAllService,
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))
}
