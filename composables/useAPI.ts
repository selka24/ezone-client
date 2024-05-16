export const useAPI: typeof useFetch = (request, opts?) => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    console.log(config.public.baseURL, 'config.public.baseURL')
    const headers: any = {};
    if(token.value){
        headers.Authorization = `Bearer ${token.value}`
    }

    return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}
