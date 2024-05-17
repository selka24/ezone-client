import type { UseFetchOptions } from 'nuxt/app'

export function useApi<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) {
    const {$toast} = useNuxtApp();

    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api,
        async onResponseError({ response }) {
            if (response.status === 401) {
                await navigateTo('/login')
            } else {
                console.log('response', $toast)
                // if(!import.meta.server)
                $toast.error('Something went wrong!')
            }
        },
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
