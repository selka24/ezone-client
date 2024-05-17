// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage} from 'nuxt/schema';

export default defineNuxtConfig({
    devtools: { enabled: true },
    typescript: {
        typeCheck: true
    },
    hooks: {
        'pages:extend' (pages) {
            function setMiddleware (pages: NuxtPage[]) {
                for (const page of pages) {
                    if (page.path.includes('admin')) {
                        page.meta ||= {}
                        // Note that this will override any middleware set in `definePageMeta` in the page
                        // page.meta.middleware = ['auth']
                        page.meta.layout = 'authenticated'
                    }
                    if (page.children) {
                        setMiddleware(page.children)
                    }
                }
            }
            setMiddleware(pages)
        }
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
        '@vee-validate/nuxt',
        '@pinia/nuxt',
        '@vesp/nuxt-fontawesome',
    ],
    fontawesome: {
        component: 'fai',
        icons: {
            solid: ['right-from-bracket', 'house'],
        }
    },
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
})
