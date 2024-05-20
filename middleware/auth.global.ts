import type {AuthUser} from "~/interfaces/main-types";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const { authenticated, authUser } = storeToRefs(authStore); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies
    const {parseJwt} = useUtils();
    const user = useCookie<AuthUser | null>('user');

    const noAuthPage = to?.name === 'login' || to?.name === 'register' || to?.path === '/';

    if (token.value && user.value) {
        // check if value exists
        // console.log(token.value)
        const {_id} = parseJwt(token.value)
        authenticated.value = _id; // update the state to authenticated
        authUser.value = user.value;
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && noAuthPage) {
        return navigateTo('/admin');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && !noAuthPage) {
        abortNavigation();
        return navigateTo('/login');
    }
});
