// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    typescript: {
        typeCheck: true
    },
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            baseURL: process.dev ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD,
        },
    },
    imports:{
        dirs: ['interfaces/*.ts']
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@vee-validate/nuxt',
    ],
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        },
    },
    formkit: {
        // Experimental support for auto loading (see note):
        autoImport: true
    }
})
