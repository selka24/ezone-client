export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const {$toast} = useNuxtApp();

    const api = $fetch.create({
        baseURL: config.public.baseURL,
        onRequest({ request, options, error }) {
            if (token.value) {
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `${token.value}`])
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `${token.value}`)
                } else {
                    headers.Authorization = `${token.value}`
                }
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await navigateTo('/login')
            } else {
                // console.log( ,'daaaaaaaa')
                if(!process.server) $toast.error(response._data)
            }
        },
    })

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api
        }
    }
})
