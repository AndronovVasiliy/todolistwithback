export type ToDolistsType = {
    id: string
    title: string,
    addedDate: string,
    order: number
    tasks?: Array<ObjTaskSendType>
}

export type ObjTaskSendType = {
    description: string;
    title: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}

export type UpdateStatusTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type AuthResponse = {
    id: number | null,
    email: string | null,
    login: string | null
}

export type TaskType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string
}