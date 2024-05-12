import * as yup from 'yup';

export const validateAuthSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().length(8),
})
