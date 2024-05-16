import {defineStore, acceptHMRUpdate} from 'pinia';

export const useCompanyStore = defineStore('companyStore', () => {

    //state
    const company = ref(null);


    return {
        company
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))

}
