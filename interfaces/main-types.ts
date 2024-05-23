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
    "duration": number
    "price": number
}

export interface Employee {
    company_id: string
    name: string
    last_name: string
    job_title: string
    services: Service[]
    working_days: WorkDay[]
}

export interface CreateCompany extends CompanyMainInfo {
    user: string
    employees?: Employee[]
}

export interface Company extends CreateCompany{
    workingDays: number[]
}
