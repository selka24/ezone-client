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
    "location": yup.string().required(),
    "phone": yup.string().matches(/^(69|67|68)\d{7}$/),
    "whatsapp_number": yup.string(),
    "instagram": yup.string(),
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
const validWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const workingDaysSchema = validWeekdays.reduce((schema, day) => {
    schema[day] = yup.object({
        day: yup.string().oneOf(validWeekdays),
        start_time: yup.number(),
        end_time: yup.number().when('start_time', ([start_time], schema) => {
            return schema.moreThan(start_time, 'End time should be greater than the start time');
        })
    }).optional(); // Day can be optional, but if present, the 'time' must be required
    return schema;
}, {})

console.log({workingDaysSchema})

export const employeeValidationSchema = yup.object({
    "company": yup.string().nullable(),
    "name": yup.string().required(),
    "lastname": yup.string().required(),
    "job_title": yup.string().required(),
    services: yup.array().transform((value, originalValue) => {
        return originalValue.map(s => {
            if( typeof s == "string" ){
                return s;
            }
            return s._id;
        });
    }).of(yup.string()).required(),
    // working_days: yup.array().of(yup.object({
    //     day: yup.string().oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
    //     start_time: yup.number(),
    //     end_time: yup.number().when('start_time', ([start_time], schema) => {
    //         return schema.moreThan(start_time, 'End time should be greater than the start time');
    //     })
    // })),
    working_days: yup.object(workingDaysSchema).test({
        name: 'at-least-one-day',
        message: 'At least one day with working hours is required',
        test: value=> {
            return Object.values(value).some(
                day => day && day.start_time !== undefined && day.end_time !== undefined
            );
        }
    })
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
    "date": yup.string().required(),
})
