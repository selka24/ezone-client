import Toast from "vue-toastification";
// import type { PluginOptions } from "vue-toastification";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast)
})
