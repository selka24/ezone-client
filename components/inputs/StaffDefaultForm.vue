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
const submittedOnce = ref(false)
// const time = ref([0,0]);

const initialEmployee = transformEditEmployee() || {
    company: companyId.value,
    working_days: {},
    password: '12345678',
    username: 'username',
    role: 'employee',
}
if(props.editEmployee){
    selectedDays.value = employeeWorkDays;
}

const {handleSubmit, resetForm, values, errors, setValues, setFieldValue} = useForm<ValidationFormEmployee>({
    validationSchema: employeeValidationSchema,
    initialValues: initialEmployee,
})

const sortWeekDays = computed(() => {
    return selectedDays.value.sort((a, b) => {
        return weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b);
    })
})

const handleEmployeeSubmit = handleSubmit((employee) => {
        console.log('employee submit 2')
        emit('employeeSubmit', {
            ...employee,
            username: employee.email.split('@')[0],
            working_days: Object.keys(employee.working_days).reduce((finalDays: WorkDay[], key) => {
                const weekDay = key as keyof WorkingDays;
                const workDay = employee.working_days[weekDay];
                if (workDay) {
                    const {day, start_time, end_time} = workDay;
                    finalDays.push({
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
const getDefaultWorkDay = (newDays: Days[]) => {
    if(newDays.length){
        const currWorkDays: WorkingDays = {};
        newDays.forEach(day => {
            console.log(day, 'dayyyyyyyy')
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

const handleApplyAll = (baseDay: Days) => {
    const baseWorkDay = values.working_days[baseDay];
    if(baseWorkDay){
        sortWeekDays.value.forEach((selDay) => {
            if(selDay !== baseDay){
                setFieldValue(`working_days.${selDay}`, {...baseWorkDay, day: selDay})
            }
        })
    }
}

const showApplyAll = computed(() => {
    if(sortWeekDays.value.length < 2)
        return false;
    const firstWorkDay = values.working_days[sortWeekDays.value[0]]
    if(firstWorkDay)
        return firstWorkDay.start_time && firstWorkDay.end_time ? firstWorkDay.end_time > firstWorkDay.start_time : false;
    return false;
})

watch(selectedDays, (newDays) => {
    console.log('setting values')
    setValues({
        ...values,
        working_days: getDefaultWorkDay(newDays),
    }, false)
});
</script>

<template>
    <form @submit.prevent="handleEmployeeSubmit"
          novalidate
          class="gap-x-5">
        <InputText name="name" class="col-span-2" :attributes="{placeholder: 'Enter staff name'}"/>
        <InputText name="lastname" class="col-span-2" :attributes="{placeholder: 'Enter staff last name'}"/>
        <InputText name="email" class="col-span-2"  :attributes="{placeholder: 'Enter staff email'}"/>
        <InputText name="password" class="col-span-2"  :attributes="{placeholder: 'Enter staff email', type: 'password'}"/>
        <InputText name="job_title" class="col-span-2"  :attributes="{placeholder: 'Enter job description'}"/>
        <InputSelect :options="services || []"
                     :multiple="true"
                     display-key="title"
                     value-key="_id"
                     class="col-span-4"
                     :attributes="{placeholder: 'Select services for this staff'}"
                     name="services"/>
        <div class="flex flex-col gap-5">
            <fieldset class="fieldset">
                <label class="label mb-3">Select working days</label>
                <WeekdayPicker v-model="selectedDays" class="justify-between"/>
            </fieldset>
            <div class="grid grid-cols-1 gap-3">
                <div class="label" v-if="errors?.working_days && submittedOnce">
                    <span class="label-text-alt text-error">{{ errors?.working_days }}</span>
                </div>
                <div v-for="(day, idx) in sortWeekDays" :key="day + '-inputGroup'"
                     class="shadow-2xl p-3 rounded grid grid-cols-3 items-start">
                    <div class="label capitalize badge-primary justify-center badge w-10/12 py-4 mt-2">{{day}}</div>
                    <InputText :name="`working_days.${day}.day`"
                               class="hidden"/>
                    <div class="grid grid-cols-11 gap-5 items-center col-span-2">
                        <InputDuration
                            class="col-span-5"
                            :name="`working_days.${day}.start_time`"
                            :attributes="{
                                hours: companyHours,
                                noLabel: true,
                                minutes: [0]
                            }"
                        />
                        <div>
                            to
                        </div>
                        <InputDuration
                            class="col-span-5"
                            :name="`working_days.${day}.end_time`"
                            :attributes="{
                                hours: companyHours,
                                noLabel: true,
                                minutes: [0]
                            }"
                        />
                        <div v-if="idx === 0 && showApplyAll" class="col-span-full flex">
                            <button type="button" class="btn btn-primary btn-xs ml-auto" @click="handleApplyAll(day)">Apply to all</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-2">
            <slot name="submitButton">
                <button type="submit" @click="() => submittedOnce = true" class="btn btn-primary mt-9 w-full">
                    <fai icon="plus"/>
                    {{ editEmployee ? 'Update' : 'Add' }}
                </button>
            </slot>
        </div>
    </form>
</template>

<style scoped>

</style>
