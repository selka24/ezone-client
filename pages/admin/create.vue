<script setup lang="ts">
import Stepper from "~/components/ui/Stepper.vue";
import MainInfoForm from "~/components/admin/createForm/MainInfoForm.vue";
import type {AuthUser, CompanyMainInfo, CreateCompany, Employee, Service} from "~/interfaces/main-types";
import ServicesForm from "~/components/admin/createForm/ServicesForm.vue";
import StaffForm from "~/components/admin/createForm/StaffForm.vue";

const authStore = useAuthStore();
const companyStore = useCompanyStore();
const {companyProfileId} = storeToRefs(companyStore)
const {$api} = useNuxtApp();
const steps = [{title: 'Main Info'},{title: 'Add Services'},{title: 'Add Staff'}];
const currStep = ref(0)
const formLoading = ref(false)
const company = ref<CreateCompany>()
const companyServices = ref<Service[]>([])
const {authUser} = storeToRefs(authStore)
const router = useRouter();

const handleCompanyServices = (values: Service[]) => {
    companyServices.value = values;
    currStep.value++;
}

const handleCreateCompany = async (values: CreateCompany) => {
    // await companyStore.actCreateCompany({...values, user: authStore.authenticated});
    try {
        formLoading.value = true;
        company.value = await $api<CreateCompany>('/profile/create', {
            method: 'POST',
            body: {...values, user: authStore.authenticated}
        })
        if(authStore.authUser){
            console.log('aaaaaaaaaaaaa', authStore.authUser)
            //@ts-ignore
            // authStore.authUser = {...authStore.authUser, companyProfileId: company.value._id}
            // const cookieUser = useCookie<AuthUser | null>('user');
            companyProfileId.value = company.value._id
            // cookieUser.value = authStore.authUser;
        }

        currStep.value++
    } catch (e) {

    } finally {
        formLoading.value = false;
    }
}

const actCreateEmployee = async (employee: Employee) => {
    try {
        if(!company.value?.employees?.length && company.value){
            company.value.employees = [];
        }


        const employeeResponse = await $api<Employee>('/employee/create', {
            method: 'POST',
            body: employee
        })

        company.value?.employees?.push(employeeResponse._id)

        console.log({employeeResponse}, company.value?.employees, 'aaaaaaaaaaaaaa')
    } catch (e) {

    }
}

// const handleCompanyEmployees = async (employee: Employee) => {
//      await actCreateEmployee(employee);
// }

const handleStaffAssign = async () => {
    if(company.value) {
        const response = await companyStore.actUpdateCompany(company.value);
        if(response === 'success'){
            if(authUser.value && company.value._id){
                authUser.value = {...authUser.value, companyProfileId: company.value._id}
                router.replace('/admin/my-business')
            }
        }
    }
}

</script>

<template>
    <div class="flex flex-col items-center gap-10">
        <Stepper :steps="steps" :curr-step="currStep" class="max-w-screen-md w-full"/>

        <div class="card shrink-0 w-full max-w-screen-sm shadow-2xl bg-base-100">
            <transition name="page" mode="out-in">
                <MainInfoForm v-if="currStep === 0"
                              @form-submit="handleCreateCompany"
                              :key="0"/>
                <ServicesForm v-else-if="currStep === 1"
                              @services-submit="handleCompanyServices"
                              :key="1"/>
                <StaffForm v-else-if="currStep === 2"
                           @employeesSubmit="actCreateEmployee"
                           @continue="handleStaffAssign"
                           :key="2"/>
            </transition>
            <span v-show="companyStore.creatingCompany" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-bars loading-lg"></span>
        </div>
    </div>
</template>
