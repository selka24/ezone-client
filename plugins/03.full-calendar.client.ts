import VFullCalendar from "~/components/ui/VFullCalendar.vue";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('BaseCalendar', VFullCalendar);
})
