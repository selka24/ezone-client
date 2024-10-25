export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const {$toast} = useNuxtApp();


    const api = $fetch.create({
        baseURL: config.public.baseURL,
        // headers,
        onRequest({ request, options, error }) {
            const token = useCookie('token');
            if (token.value) {
                options.headers.append('Authorization', token.value);
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await navigateTo('/login')
            } else {
                if(!import.meta.server) $toast.error(response._data?.message || 'Something went wrong!')
            }
        },
    })

    const apiService = {
        post: (url: string, {body}: {body: any}) => api(url, {
            method: 'POST',
            body
        }),
        get: (url: string, params?: any) => api(url, {
            method: 'GET',
            ...(params ? {params} : {})
        })
    }

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api,
            apiService
        }
    }
})
