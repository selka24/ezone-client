import {defineStore, acceptHMRUpdate} from 'pinia';

export const useAuthStore =     defineStore('authStore', () => {
    //state
    const authUser = ref<AuthUser | null>(null);
    const authLoading = ref<boolean>(false);

    //actions
    const registerUser = async (userInfo: AuthRegister) => {
        authLoading.value = true;
        const {data, error} = await useAPI<AuthUser>('/register', {
            method: 'POST',
            body: userInfo
        })
        setTimeout(() => {
            authLoading.value = false;
        }, 800)
        console.log(error.value?.data, 'error', data.value);
        console.log('teeest')
        authUser.value = data.value;
    }

    return {
        authUser,
        authLoading,
        registerUser
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
