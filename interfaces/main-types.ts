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
    _id?: string
    image?: string
    description: string
    name: string
    show_price: boolean
    location: string
}

export enum Days {
    monday = "monday",
    tuesday = "tuesday",
    wednesday = "wednesday",
    thursday = "thursday",
    friday = "friday",
    saturday = "saturday",
    sunday = "sunday",
}

export interface WorkDay {
    day: Days,
    start_time: string | number
    end_time: string | number
}


export interface Service {
    "title": string
    "id"?: string
    "company"?: string
    "_id"?: string
    "duration": number
    "price": number
}

export interface WorkingDays {
    monday?: WorkDay;
    tuesday?: WorkDay;
    wednesday?: WorkDay;
    thursday?: WorkDay;
    friday?: WorkDay;
    saturday?: WorkDay;
    sunday?: WorkDay;
}

interface BaseEmployee {
    _id: string,
    company: string
    name: string
    lastname: string
    job_title: string
    services: Service[]
}

export interface Employee extends BaseEmployee{
    working_days: WorkDay[]
}

export interface ValidationFormEmployee extends BaseEmployee {
    working_days: WorkingDays
}

export interface CreateCompany extends CompanyMainInfo {
    user?: string
    employees?: string[]
}

export interface Company extends CompanyMainInfo{
    user?: string
    workingDays: number[]
    employees?: Employee[]
}

export interface BookingTime {
    start_time: string,
    end_time: string,
    availableEmpl: string[]
}
