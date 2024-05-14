import {date} from "yup"

export type AuthLogin = {
    email: string
    password: string
}

export type AuthRegister = {
    email: string
    password: string
    username: string
    role: string
}

export type AuthUser = {
    _id: string
    username: string
    email: string
    role: string[]
    createdAt: Date
    updatedAt: Date
    __v: number
    token: string
}
