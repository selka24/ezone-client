import {defineStore, acceptHMRUpdate} from 'pinia';

export const useAuthStore =     defineStore('authStore', () => {
    const router = useRouter();
    const {parseJwt} = useUtils();
    const { $toast: toast } = useNuxtApp()
    //state
    const authUser = ref<AuthUser | null>(null);
    const authLoading = ref<boolean>(false);
    const authenticated = ref<string>('');

    //actions
    const registerUser = async (userInfo: AuthRegister) => {
        authLoading.value = true;
        const {data, error} = await useAPI<AuthUser>('/register', {
            method: 'POST',
            body: userInfo
        })
        console.log(error.value?.data, 'error', data.value);
        if(!error.value){
            await authenticateUser({
                email: userInfo.email,
                password: userInfo.password
            })
        } else {
            authLoading.value = false
        }
    }

    const authenticateUser = async ({email, password}: AuthLogin) => {
        const {data, error, pending} = await useAPI<AuthUser>('/login', {
            method: 'POST',
            body: {
                email,
                password
            }
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
                console.log()
                toast.error(error.value.data)
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
