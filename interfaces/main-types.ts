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
}

export interface Company {
    user: string
    image: string
    description: string
    name: string
    employees: any[]
    show_price: boolean
    location: string
}
