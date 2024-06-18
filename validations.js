import * as yup from 'yup';
import {getUnixTime} from 'date-fns';

const mainInfoObject = {
    "image": yup.string(),
    "description": yup.string().required(),
    "name": yup.string().required(),
    "show_price": yup.boolean(),
    "location": yup.string().required()
}


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
    "duration": yup.number().integer().required().min(5, 'duration must be greater than or equal to 5 minutes'),
    "price": yup.number().required()
})

export const employeeValidationSchema = yup.object({
    "company_id": yup.string().nullable(),
    "name": yup.string().required(),
    "lastname": yup.string().required(),
    "job_title": yup.string().required(),
    services: yup.array().of(serviceValidationSchema).nullable()
})


export const mainInfoValidationSchema = yup.object(mainInfoObject)

export const servicesSchema = yup.object({
    services: yup.array().of(serviceValidationSchema).nullable()
})

export const companyValidationSchema = yup.object({
    ...mainInfoObject,
    "employees": yup.array().of(employeeValidationSchema).nullable(),
})

export const bookingFormValidationSchema = yup.object({
    "service_id": yup.string().required(),
    "name": yup.string().required(),
    "phone": yup.number().required(),
    "email": yup.string().required(),
    "time": yup.string().transform(val => {
        console.log(val, 'valaaaaaaa')
        const [hour, minutes] = val
        const date = new Date();
        date.setHours(hour, minutes)
        const finalVal = JSON.stringify(getUnixTime(date));
        console.log('finalVal', finalVal)
        return finalVal;
    }).required(),
    "date": yup.string().transform(val => JSON.stringify(getUnixTime(new Date(val)))).required(),
})
