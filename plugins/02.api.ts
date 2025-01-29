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
                console.log(response._data, 'response._data')
                if(!import.meta.server) {
                    let toastMsg = 'Something went wrong!';
                    if(response._data){
                        if(typeof response._data === 'string') {
                            toastMsg = response._data;
                        } else if(response._data.message) {
                            toastMsg = response._data.message;
                        }
                    }
                    $toast.error(toastMsg);
                }
            }
        },
    })

    const apiService = {
        post: <T>(url: string, { body }: { body: any }): Promise<T> =>
            api(url, {
                method: 'POST',
                body,
            }),
        put: <T>(url: string, { body }: { body: any }): Promise<T> =>
            api(url, {
                method: 'PUT',
                body,
            }),
        get: <T>(url: string, params?: any): Promise<T> =>
            api(url, {
                method: 'GET',
                ...(params ? { params } : {}),
            }),
        delete: <T>(url: string): Promise<T> =>
            api(url, {
                method: 'DELETE',
            }),
    };

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api,
            apiService
        }
    }
})
