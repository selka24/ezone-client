export const useAPI: typeof useFetch = (request, opts?) => {
    const config = useRuntimeConfig();
    const token = useCookie('token');
    const headers: any = {};
    if(token.value){
        headers.Authorization = `Bearer ${token.value}`
    }
    console.log(headers, 'config.public.baseURL')

    return useFetch(request, { baseURL: config.public.baseURL, headers, ...opts })
}
