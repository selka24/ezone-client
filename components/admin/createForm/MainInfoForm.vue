<script setup lang="ts">
import InputToggle from "~/components/inputs/InputToggle.vue";
import InputText from "~/components/inputs/InputText.vue";
import {mainInfoValidationSchema} from "~/validations";
import type {CompanyMainInfo} from "~/interfaces/main-types";

const emit = defineEmits<{
    formSubmit: [CompanyMainInfo]
}>()

const {handleSubmit} = useForm<CompanyMainInfo>({
    validationSchema: mainInfoValidationSchema,
    initialValues: {
        show_price: false
    }
})

const handleMainInfoSubmit = handleSubmit((values) => {
    emit('formSubmit', values)
})
</script>

<template>
    <form @submit.prevent="handleMainInfoSubmit" class="card-body" novalidate>
        <div class="mb-2">
            <h1 class="card-title mb-3">Informacioni kryesor </h1>
            <p>Ju lutem shtoni te dhenat baze te biznesit</p>
        </div>
        <InputText name="name" :attributes="{placeholder: 'Emri i biznesit tuaj'}"/>
        <InputText name="description" :attributes="{placeholder: 'Nje pershkrim i shkurter'}"/>
        <InputToggle name="show_price" label="Show Price" />
        <InputText name="location" :attributes="{placeholder: 'Vendndodhja e biznesit'}"/>
        <button class="btn btn-primary">
            <span>
                Vazhdo
            </span>
        </button>
    </form>
</template>

<style scoped>

</style>
