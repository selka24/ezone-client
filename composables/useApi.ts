import type { UseFetchOptions } from 'nuxt/app'

export function useApi<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T>},
    customOptions: {noToast: boolean} = {noToast: false}
) {
    const {$toast} = useNuxtApp();
    const {noToast} = customOptions;

    return useFetch(url, {
        async onResponseError({ response }) {
            if (response.status === 401) {
                await navigateTo('/login')
            } else {
                // if(!import.meta.server)
                if(!process.server && !noToast) {
                    console.log('response', $toast)
                    $toast.error('Something went wrong!')
                }
            }
        },
        ...options,
        $fetch: useNuxtApp().$api,
    })
}

// export const useApi: typeof useFetch = (request, opts?) => {
//     const config = useRuntimeConfig();
//     const token = useCookie('token');
//     const {$toast} = useNuxtApp();
//     const headers: any = {};
//     if(token.value){
//         headers.Authorization = `Bearer ${token.value}`
//     }
//     console.log(headers, 'config.public.baseURL')
//
//     return useFetch(request, {
//         baseURL: config.public.baseURL,
//         headers,
//         ...opts,
//         async onRequestError({request, options, error}){
//             console.log(error)
//         }
//     })
// }
