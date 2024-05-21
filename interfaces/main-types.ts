import * as yup from "yup";

export interface AuthLogin {
    email: string
    password: string
}

export interface AuthRegister {
    email: string
    password: string
    username: string
    role: string
}

export interface AuthUser {
    _id: string
    username: string
    email: string
    role: string[]
    createdAt: Date
    updatedAt: Date
    __v: number
    token: string
    companyProfileId: string
}

export interface CompanyMainInfo {
    image?: string
    description: string
    name: string
    show_price: boolean
    location: string
}

export interface Service {
    "title": string
    "duration": number
    "price": number
}

export interface CreateCompany extends CompanyMainInfo {
    user: string
    employees?: any[]
}

export interface Company extends CreateCompany{
    workingDays: number[]
}
