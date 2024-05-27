export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const {$toast} = useNuxtApp();


    const api = $fetch.create({
        baseURL: config.public.baseURL,
        // headers,
        onRequest({ request, options, error }) {
            const token = useCookie('token');
            if (token.value) {
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `${token.value}`])
                    console.log(token.value, 'array toookeeen')
                } else if (headers instanceof Headers) {
                    console.log(token.value, 'SEET toookeeen')
                    headers.set('Authorization', `${token.value}`)
                } else {
                    // console.log(token.value, 'normal toookeeen')
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
