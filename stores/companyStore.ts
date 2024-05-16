import {defineStore, acceptHMRUpdate} from 'pinia';

export const useCompanyStore = defineStore('companyStore', () => {

    //state
    const company = ref(null);
    const creatingCompany = ref(false);

    //actions
    const actCreateCompany = async (companyInfo: Company) => {
        const {data, error, pending} = await useAPI('/profile/create', {
            method: 'POST',
            body: companyInfo
        })
        creatingCompany.value = pending.value;

        console.log(data.value, 'created company');
        if(data.value) {

        } else {

        }
    }

    return {
        company,
        creatingCompany,
        actCreateCompany
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))

}
