export const useAPI: typeof useFetch = (request, opts?) => {
    const config = useRuntimeConfig()
    console.log(config.public.baseURL, 'config.public.baseURL')
    return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}
