import type {AuthUser, AuthRegister, AuthLogin} from "~/interfaces/main-types";
import {acceptHMRUpdate, defineStore} from 'pinia';

export const useAuthStore =     defineStore('authStore', () => {
    const router = useRouter();
    const { $toast, $api } = useNuxtApp();
    const companyStore = useCompanyStore()

    //state
    const authUser = ref<AuthUser | null>(null);
    const authLoading = ref<boolean>(false);
    const authenticated = ref<string>('');

    //actions
    const registerUser = async (userInfo: AuthRegister) => {
        authLoading.value = true;
        try {
            await $api('/register', {
                method: 'POST',
                body: userInfo,
            })

            await authenticateUser({
                email: userInfo.email,
                password: userInfo.password
            })
        } catch (e) {

        } finally {
            authLoading.value = false;
        }
    }

    const authenticateUser = async ({email, password}: AuthLogin) => {
        try {
            authLoading.value = true;
            const data = await $api<AuthUser>('/login', {
                method: 'POST',
                body: {email, password}
            })

            authUser.value = data;
            authenticated.value = data._id;

            const token = useCookie('token');
            const userCookie = useCookie('user');

            userCookie.value = JSON.stringify(data);
            token.value = data.token;
            // await actGetMyCompany();
            await router.push('/admin');
        } catch (e) {

        } finally {
            authLoading.value = false;
        }
    }

    const actLogOut = () => {
        const token = useCookie('token');
        const userCookie = useCookie('user');
        token.value = null;
        userCookie.value = null;
        authUser.value = null;
        authenticated.value = '';
        router.push('/');
    }

    return {
        authenticated,
        authUser,
        authLoading,
        authenticateUser,
        actLogOut,
        registerUser,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
