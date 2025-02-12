// https://nuxt.com/docs/api/configuration/nuxt-config
import type {NuxtPage} from 'nuxt/schema';

export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: false,
    typescript: {
        typeCheck: true
    },

    hooks: {
        'pages:extend'(pages) {
            function setMiddleware(pages: NuxtPage[]) {
                for (const page of pages) {
                    if (page.path.includes('admin')) {
                        page.meta ||= {};
                        // Note that this will override any middleware set in `definePageMeta` in the page
                        // page.meta.middleware = ['auth']
                        page.meta.layout = 'authenticated';
                    }
                    if (page.children) {
                        setMiddleware(page.children)
                    }
                }
            }

            setMiddleware(pages)
        }
    },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/transitions.css',
    ],

    runtimeConfig: {
        public: {
            baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD,
        },
    },

    imports: {
        dirs: ['interfaces/*.ts']
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@vesp/nuxt-fontawesome',
    ],

    fontawesome: {
        component: 'fai',
        icons: {
            solid: [
                'right-from-bracket',
                'chevron-left',
                'pencil',
                'pen',
                'chevron-right',
                'house',
                'sheet-plastic',
                'wallet',
                'gear',
                'circle-xmark',
                'plus',
                'trash',
                'eye',
                'people-group',
                'chart-simple',
                'magnifying-glass-chart',
                'user',
                'xmark',
                'check',
                'copy',
            ],
            regular: [
                'building',
            ]
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

    tailwindcss: {
        exposeConfig: true,
        viewer: false
    },

    compatibilityDate: '2024-10-25',
})