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

enum Days {
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
    start_time: string
    end_time: string
}


export interface Service {
    "title": string
    "id"?: string
    "duration": number
    "price": number
}

export interface Employee {
    _id: string,
    company_id: string
    name: string
    lastname: string
    job_title: string
    services: Service[]
    working_days: WorkDay[]
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
