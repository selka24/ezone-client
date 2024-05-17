import {acceptHMRUpdate, defineStore} from 'pinia';
import type {AuthUser} from "~/interfaces/main-types";

export const useAuthStore =     defineStore('authStore', () => {
    const router = useRouter();
    const {parseJwt} = useUtils();
    const { $toast, $api } = useNuxtApp()

    //state
    const authUser = ref<AuthUser | null>(null);
    const authLoading = ref<boolean>(false);
    const authenticated = ref<string>('');

    //actions
    const registerUser = async (userInfo: AuthRegister) => {
        authLoading.value = true;
        try {
            authUser.value = await $api<AuthUser>('/register', {
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
        const {data, error, pending} = await useApi<AuthUser>('/login', {
            method: 'POST',
            body: { email, password },
            //@ts-ignore
            default: {}
        })
        console.log('pending', pending.value)
        authLoading.value = pending.value;
        if(data.value){
            const token = useCookie('token');
            token.value = data.value.token;
            authUser.value = data.value;
            authenticated.value = parseJwt(token.value)._id;

            await router.push('/admin')
        } else {
            if(error.value){
                // $toast.clear();
                // $toast.error(error.value.data)
            }
        }
    }

    const actLogOut = () => {
        const token = useCookie('token');
        token.value = null;
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
