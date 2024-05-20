import type {AuthUser} from "~/interfaces/main-types";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const { authenticated, authUser } = storeToRefs(authStore); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies
    const {parseJwt} = useUtils();
    const user = useCookie<AuthUser | null>('user');

    const noAuthPage = to?.name === 'login' || to?.name === 'register' || to?.path === '/';
    const noCompanyPages = ['/admin/create', '/admin'];
    const requiresCompany = !noCompanyPages.includes(to.path);
    const hasCompany = authUser.value?.companyProfileId;

    if (token.value && user.value) {
        // check if value exists
        const {_id} = parseJwt(token.value)
        authenticated.value = _id; // update the state to authenticated
        authUser.value = user.value;
        if(!hasCompany && requiresCompany){
            return navigateTo('/admin');
        }
    }

    // if token exists and url is /login redirect to admin
    if (token.value && noAuthPage) {
        return navigateTo('/admin');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && !noAuthPage) {
        abortNavigation();
        return navigateTo('/login');
    }
});
