<script setup lang="ts">
import InputText from "~/components/inputs/InputText.vue";
import InputSelect from "~/components/inputs/InputSelect.vue";
import type {Employee} from "~/interfaces/main-types";
import { Days } from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";
import InputDuration from "~/components/inputs/InputDuration.vue";
import WeekdayPicker from "~/components/ui/WeekdayPicker.vue";

const emit = defineEmits<{
    employeeSubmit: [Employee]
}>()

const companyStore = useCompanyStore();

//refactor this
const companyHours = Array.from({ length: 23 - 9 + 1 }, (_, i) => 9 + i);

const selectedDays = ref<Days[]>([])
const companyId = computed(() => companyStore.company?._id || '');
const services = computed(() => companyStore.services);
const time = ref([0,0]);

const {handleSubmit, resetForm, values} = useForm<Employee>({
    validationSchema: employeeValidationSchema,
    initialValues: {
        company: companyId.value,
        working_days: []
    }
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    emit('employeeSubmit', employee)
})

const getDefaultWorkDay = () => {
    if(selectedDays.value.length){
        return selectedDays.value.map(day => {
            const foundWorkDay = values.working_days.find((workDay) => workDay.day === day);
            if(foundWorkDay)
                return foundWorkDay;
            return {
                day,
                start_time: 0,
                end_time: 0,
            }
        })
    }
    return [];
}

watch(selectedDays, () => {
    console.log('reseetting form')
    resetForm({
        values: {
            ...values,
            working_days: getDefaultWorkDay(),
        }
    })
});
</script>

<template>
    <form @submit.prevent="handleEmployeeSubmit"
          novalidate
          class="gap-x-5">
        {{values}}
        <InputText name="name" class="col-span-2" :attributes="{placeholder: 'Enter staff name'}"/>
        <InputText name="lastname" class="col-span-2" :attributes="{placeholder: 'Enter staff last name'}"/>
        <InputText name="job_title" class="col-span-2"  :attributes="{placeholder: 'Enter job description'}"/>
        <InputSelect :options="services"
                     :multiple="true"
                     display-key="title"
                     class="col-span-4"
                     :attributes="{placeholder: 'Select services for this staff'}"
                     name="services"/>
        <WeekdayPicker v-model="selectedDays"/>
        <div v-for="(day, idx) in selectedDays" :key="day + '-inputGroup'">
            <InputText :name="`working_days[${idx}].day`"
                       class="hidden"/>
            <div class="col-span-full grid grid-cols-2 gap-5">
                <InputDuration
                    class="col-span-1"
                    :name="`working_days[${idx}].start_time`"
                    :attributes="{
                        hours: companyHours,
                        label: 'Start time',
                        minutes: [0]
                    }"
                />
                <InputDuration
                    class="col-span-1"
                    :name="`working_days[${idx}].end_time`"
                    :attributes="{
                        hours: companyHours,
                        label: 'End time',
                        minutes: [0]
                    }"
                />
            </div>
        </div>
        <div class="col-span-2">
            <slot name="submitButton">
                <button type="submit" class="btn btn-primary mt-9 w-full">
                    <fai icon="plus"/>
                    Add
                </button>
            </slot>
        </div>
    </form>
</template>

<style scoped>

</style>
