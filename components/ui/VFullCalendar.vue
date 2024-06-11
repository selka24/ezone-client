<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import events, { TODAY } from "@/core/data/events";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const newEvent = () => {
    console.log('new eeevvveent')
}

const calendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin],
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    initialDate: TODAY,
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    initialView: 'resourceTimelineWeek',
    views: {
        dayGridMonth: { buttonText: "month" },
        timeGridWeek: { buttonText: "week" },
        timeGridDay: { buttonText: "day" },
    },

    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: events,
    dateClick: newEvent,
    eventClick: newEvent,
};
</script>

<template>
    <FullCalendar
        ref="calendarRef"
        :options="calendarOptions" />
</template>

<style scoped>

</style>
