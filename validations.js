// @ts-ignore
// @ts-ignore

import * as yup from 'yup';
// import {getUnixTime} from 'date-fns';
import moment from "moment";

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
    "company": yup.string().nullable(),
    "name": yup.string().required(),
    "lastname": yup.string().required(),
    "job_title": yup.string().required(),
    services: yup.array().of(yup.string()).required(),
    working_days: yup.array().of(yup.object({
        day: yup.string().oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
        start_time: yup.number(),
        end_time: yup.number().when('start_time', ([start_time], schema) => {
            return schema.moreThan(start_time, 'End time should be greater than the start time');
        })
    })),
})

export const testValidation = async () => {
    const validation = await employeeValidationSchema.validate({
        company: 'company',
        name: 'name',
        lastname: 'lastname',
        job_title: 'job_title',
        services: [123],
        working_days: [{
            day: 'monday',
            start_time: 12345678,
            end_time: 12345688,
        }],
    })

    console.log(validation, 'validation validation')
}


export const mainInfoValidationSchema = yup.object(mainInfoObject)

export const servicesSchema = yup.object({
    services: yup.array().of(serviceValidationSchema).nullable()
})

export const companyValidationSchema = yup.object({
    ...mainInfoObject,
    "employees": yup.array().of(employeeValidationSchema).nullable(),
})

export const bookingFormValidationSchema = yup.object({
    "service": yup.string().required(),
    "company": yup.string().required(),
    "name": yup.string().required(),
    "phone": yup.number().required(),
    "email": yup.string().email().required(),
    "selectedTime": yup.object({
        start_time: yup.string().required(),
        end_time: yup.string().required(),
        availableEmpl: yup.array().of(yup.string()).required(),
    }).required(),
    "employee": yup.string().required(),
    "date": yup.string().transform(val => moment(val).format('YYYY-MM-DD HH:mm')).required(),
})
