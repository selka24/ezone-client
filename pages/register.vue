<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    }),
});

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const onSubmit = handleSubmit(values => {
    console.log(values, 'valuees')
    useAPI('/login', {
        method: 'POST',
        body: values
    })
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
</script>

<template>
    <form @submit="onSubmit" class="max-w-sm">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Your Email</span>
            </div>
            <input type="email" v-model="email" v-bind="emailAttrs" class="input input-bordered"/>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
            </div>
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <input type="password" v-model="password" v-bind="passwordAttrs" class="input input-bordered"/>
            <div class="label">
                <span class="label-text-alt text-error">{{ errors.password }}</span>
            </div>
        </label>

        <button class="btn btn-primary">Submit</button>
    </form>
</template>
