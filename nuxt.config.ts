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
                    console.log(page)
                    if (/* some condition */ true) {
                        page.meta ||= {}
                        // Note that this will override any middleware set in `definePageMeta` in the page
                        page.meta.middleware = ['named']
                    }
                    if (page.children) {
                        console.log(page.children)
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
        '@formkit/nuxt',
        '@vee-validate/nuxt',
        '@pinia/nuxt'
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
