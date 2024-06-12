<script setup lang="ts">
    const route = useRoute();
    const router = useRouter();
    const companyStore = useCompanyStore()
    const sidebarMenu = [
        {title: 'Dashboard', icon: 'chart-simple', route: '/admin'},
        {title: 'Staff', icon: 'people-group', route: '/admin/staff' },
        {title: 'My Business', icon: 'far building', route: '/admin/my-business'},
        {title: 'Portfolio', icon: 'wallet'},
        {title: 'Booking', icon: 'sheet-plastic'},
        {title: 'Reports', icon: 'magnifying-glass-chart'},
        {title: 'Settings', icon: 'gear'},
    ]

    const menu = sidebarMenu.map(item => {
        let icon = item.icon.split(' ');
        if(icon.length === 1){
            icon = ['fas', ...icon]
        }
        return {
            title: item.title,
            route: item.route || '/',
            icon
        }
    })

    const handleNavigation = (goTo: string, title?: string) => {
        if(title === 'Booking'){
            router.push(`/booking/${companyStore.company?._id}`)
        } else {
            router.push(goTo)
        }
    }
</script>

<template>
    <div class="fixed h-[100vh]  z-10 flex flex-col bg-base-200 pl-3 top-0">
        <h2 class="text-3xl font-bold ml-auto pr-8 mb-8 mt-5">
            E ZON
        </h2>
        <div class="rounded-md">
            <ul class="tabs flex-col items-center">
                <li v-for="(item, idx) in menu"
                    :key="item.title"
                    @click="handleNavigation(item.route, item.title)"
                    :class="['cursor-pointer w-full flex gap-2 py-3 pl-3 pr-8 my-3 rounded-l-3xl relative', {'active bg-base-100 text-fe5d0d': route.path === item.route}]">
                    <a @click.prevent>
                        <fai :icon="item.icon" :class="['text-lg', (route.path === item?.route ? 'text-primary' : 'text-white')]"/>
                    </a>
                    <!--                        <a>-->
                    <!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
                    <!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
                    <!--                            </svg>-->
                    <!--                        </a>-->
                    <div :class="['font-semibold', (route.path === item.route ? 'text-primary' : 'text-white')]">{{item.title}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.tabs li:before, .tabs li a:before {
    /* All pseudo elements are
       abs. positioned and on bottom */
    position: absolute;
    top: -13px;
}
.tabs li:after, .tabs li a:after {
    /* All pseudo elements are
       abs. positioned and on bottom */
    position: absolute;
    bottom: -13px;
}
/* Only the first, last, and active
   tabs need pseudo elements at all */
.tabs li:last-child:after,   .tabs li:last-child a:after,
.tabs li:first-child:before, .tabs li:first-child a:before,
.tabs .active:after,   .tabs .active:before,
.tabs .active a:after, .tabs .active a:before {
    content: "";
}
.tabs .active:before, .tabs .active:after {
    @apply bg-base-100;
    /* Squares below circles */
    z-index: 1;
}
/* Squares */
.tabs  li:before, .tabs li:after {
    width: 30px;
    height: 30px;
}
.tabs li:before {
    right: 0;
}
.tabs li:after {
    right: 0;
}
/* Circles */
.tabs li a:after, .tabs li a:before {
    width: 40px;
    height: 20px;
    /* Circles are circular */
    -webkit-border-radius: 20px;
    -moz-border-radius:    20px;
    border-radius:         20px;

    /* Circles over squares */
    z-index: 2;
}
.tabs .active a:after, .tabs .active a:before {
    @apply bg-base-200;
}
/* First and last tabs have different
   outside color needs
.tabs li:first-child.active a:before,
.tabs li:last-child.active a:after {
}
*/
.tabs li a:before {
    right: 0;
    top: -20px;

}
.tabs li a:after {
    right: 0;
    bottom: -20px;
}

.text-fe5d0d{
    @apply text-base-200
}
</style>
