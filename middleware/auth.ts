export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const { authenticated } = storeToRefs(authStore); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies
    const {parseJwt} = useUtils();

    if (token.value) {
        // check if value exists
        // console.log(token.value)
        const {_id} = parseJwt(token.value)
        authenticated.value = _id; // update the state to authenticated
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
});
