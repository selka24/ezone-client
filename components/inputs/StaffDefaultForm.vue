<script setup lang="ts">
import InputText from "~/components/inputs/InputText.vue";
import InputSelect from "~/components/inputs/InputSelect.vue";
import type {Employee, ValidationFormEmployee, WorkingDays} from "~/interfaces/main-types";
import { Days } from "~/interfaces/main-types";
import {employeeValidationSchema} from "~/validations";
import InputDuration from "~/components/inputs/InputDuration.vue";
import WeekdayPicker from "~/components/ui/WeekdayPicker.vue";
import moment from "moment";

const emit = defineEmits<{
    employeeSubmit: [Employee]
}>()

const props = defineProps<{
    editEmployee?: Employee
}>();

const calculateMinutesFromDate = (date: string | number) => {
    const parseDate = new Date(date);
    const hours = parseDate.getHours();
    const minutes = parseDate.getMinutes();
    return minutes + (hours * 60);
}
const employeeWorkDays: Days[] = [];

const transformEditEmployee = () => {
    if(!props.editEmployee)
        return null;
    let newWorkingDays: WorkingDays = {};
    props.editEmployee.working_days.forEach((workingDay) => {
        employeeWorkDays.push(workingDay.day);
        const start_time = calculateMinutesFromDate(workingDay.start_time);
        const end_time = calculateMinutesFromDate(workingDay.end_time);

        newWorkingDays = {
            ...newWorkingDays,
            [workingDay.day]: {
                day: workingDay.day,
                start_time,
                end_time
            }
        }
    })
    return {
        ...props.editEmployee,
        working_days: newWorkingDays
    }
}

const companyStore = useCompanyStore();
const weekdayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

//refactor this
const companyHours = Array.from({ length: 23 - 9 + 1 }, (_, i) => 9 + i);

const selectedDays = ref<Days[]>([])
const companyId = computed(() => companyStore.company?._id || '');
const services = computed(() => companyStore.services);
// const time = ref([0,0]);

const initialEmployee = transformEditEmployee() || {
    company: companyId.value,
    working_days: {}
}
if(props.editEmployee){
    selectedDays.value = employeeWorkDays;
}

const {handleSubmit, resetForm, values, errors} = useForm<ValidationFormEmployee>({
    validationSchema: employeeValidationSchema,
    initialValues: initialEmployee
})

const sortWeekDays = computed(() => {
    return selectedDays.value.sort((a, b) => {
        return weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b);
    })
})

const handleEmployeeSubmit = handleSubmit((employee) => {
    emit('employeeSubmit', {
        ...employee,
        working_days: Object.keys(employee.working_days).reduce((finalDays: WorkDay[], key) => {
            const weekDay = key as keyof WorkingDays;
            const workDay = employee.working_days[weekDay];
            if (workDay) {
                const {day, start_time, end_time} = workDay;
                finalDays.push( {
                    day,
                    start_time: `${moment().startOf('day').add(start_time, 'minutes').toISOString()}`,
                    end_time: `${moment().startOf('day').add(end_time, 'minutes').toISOString()}`,
                })
            }
            return finalDays
        }, [])
    })
})
//
const getDefaultWorkDay = () => {
    if(selectedDays.value.length){
        const currWorkDays: WorkingDays = {};
        selectedDays.value.forEach(day => {
            const foundWorkDay = values.working_days?.[day];
            if(foundWorkDay)
                currWorkDays[day] = foundWorkDay;
            else {
                currWorkDays[day] = {
                    day,
                    start_time: 0,
                    end_time: 0,
                }
            }
        })
        return currWorkDays
    }
    return {};
}

watch(selectedDays, () => {
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
        <InputText name="name" class="col-span-2" :attributes="{placeholder: 'Enter staff name'}"/>
        <InputText name="lastname" class="col-span-2" :attributes="{placeholder: 'Enter staff last name'}"/>
        <InputText name="job_title" class="col-span-2"  :attributes="{placeholder: 'Enter job description'}"/>
        <InputSelect :options="services || []"
                     :multiple="true"
                     display-key="title"
                     value-key="_id"
                     class="col-span-4"
                     :attributes="{placeholder: 'Select services for this staff'}"
                     name="services"/>
        <div class="flex flex-col gap-5">
            <div class="form-control w-full">
                <div class="label mb-3">Select working days</div>
                <WeekdayPicker v-model="selectedDays" class="justify-between"/>
            </div>
            <div class="grid grid-cols-1 gap-5">
                <div v-for="(day, idx) in sortWeekDays" :key="day + '-inputGroup'"
                     class="shadow-2xl p-3 rounded">
                    <div class="label capitalize text-primary">{{day}}</div>
                    <InputText :name="`working_days.${day}.day`"
                               class="hidden"/>
                    <div class="grid grid-cols-11 gap-5 items-center">
                        <InputDuration
                            class="col-span-5"
                            :name="`working_days.${day}.start_time`"
                            :attributes="{
                                hours: companyHours,
                                label: 'Start time',
                                minutes: [0]
                            }"
                        />
                        <div class="justify-center flex mt-7">
                            -
                        </div>
                        <InputDuration
                            class="col-span-5"
                            :name="`working_days.${day}.end_time`"
                            :attributes="{
                                hours: companyHours,
                                label: 'End time',
                                minutes: [0]
                            }"
                        />
                    </div>
                </div>
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
