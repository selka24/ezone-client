import * as yup from 'yup';



export const registerValidationSchema = yup.object({
    email: yup.string().email().required(),
    username: yup.string().min(4).required(),
    role: yup.string().required(),
    password: yup.string().min(6).required(),
})

export const loginValidationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

export const serviceValidationSchema = yup.object({
    "title": yup.string().required(),
    "duration": yup.number().integer().required(),
    "price": yup.number()
})

export const employeeValidationSchema = yup.object({
    "company_id": yup.string().nullable(),
    "name": yup.string().required(),
    "lastname": yup.string().required(),
    "job_title": yup.string().required(),
    services: yup.array().of(serviceValidationSchema).nullable()
})

export const companyValidationSchema = yup.object({
    // "user": yup.string().required(),
    "image": yup.string(),
    "description": yup.string().required(),
    "name": yup.string().required(),
    "employees": yup.array().of(employeeValidationSchema).nullable(),
    "show_price": yup.boolean(),
    "location": yup.string().required()
})
