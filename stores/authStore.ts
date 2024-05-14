import {defineStore, acceptHMRUpdate} from 'pinia';
import type {AuthLogin, AuthUser} from "~/interfaces/main-types";

export const useAuthStore =     defineStore('authStore', () => {
    //state
    const authUser = ref<AuthUser | null>(null);
    const authLoading = ref<boolean>(false);
    const authenticated = ref<boolean>(false);

    //actions
    const registerUser = async (userInfo: AuthRegister) => {
        // authLoading.value = true;
        const {data, error, pending} = await useAPI<AuthUser>('/register', {
            method: 'POST',
            body: userInfo
        })
        authLoading.value = pending.value
        //setTimeout(() => {
        //     authLoading.value = false;
        // }, 800)
        console.log(error.value?.data, 'error', data.value);
        if(data.value){
            const token = useCookie('token');
            authUser.value = data.value;
            token.value = data.value.token;
        }
    }

    const authenticateUser = async ({email, password}: AuthLogin) => {
        const {data, pending} = useFetch<AuthUser>('/login', {
            method: 'POST',
            body: {
                email,
                password
            }
        })
        authLoading.value = pending.value;
        if(data.value){
            const token = useCookie('token');
            authUser.value = data.value;
            token.value = data.value.token;
        }
    }

    return {
        authenticated,
        authUser,
        authLoading,
        authenticateUser,
        registerUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
