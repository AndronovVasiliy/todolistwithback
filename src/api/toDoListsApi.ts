import { TaskType, UpdateStatusTaskType } from "../types/types"
import { instance } from "./api"

export const toDoListsApi = {
    getToDoLists() {
        return instance.get("todo-lists").then(res => res)
    },
    saveToDoList(title: string){
        return instance.post(`/todo-lists`, {title: title}).then(res => res)
    },
    addTask(todolist: TaskType, taskId: string){
        return instance.post(`/todo-lists/${taskId}/tasks`, todolist)
    },
    getTasks(todolistId: string){
        return instance.get(`/todo-lists/${todolistId}/tasks?count=${100}`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateStatusTask(todolistId: string, taskId: string, objSend: UpdateStatusTaskType){
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, objSend)
    },
    deleteToDoList(todolistId: string){
        return instance.delete(`/todo-lists/${todolistId}`)
    }
}