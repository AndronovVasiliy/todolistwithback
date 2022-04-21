import { ThunkAction } from "redux-thunk";
import { toDoListsApi } from "../api/toDoListsApi";
import { RootState } from "../store/store";
import { TaskType, ToDolistsType, UpdateStatusTaskType } from "../types/types";

const previewObj = {
    id: '',
    title: '',
    addedDate: '',
    order: '',
    tasks: ''
}    

let initialState = {
    toDoLists: [] as Array<ToDolistsType>,
    previewtoDoLists: [previewObj, previewObj, previewObj, previewObj]
}

type ActionType = ReturnType<typeof setToDoLists>


export function reduserToDoList(state = initialState, action: ActionType) {
    switch (action.type) {
        case "SET_TODO_LISTS": {
            return { ...state, toDoLists: [...action.toDoLists] }
        }
        default: return state
    }
}

const setToDoLists = (toDoLists: Array<ToDolistsType>) => ({ type: "SET_TODO_LISTS", toDoLists } as const)

export const getToDoLists = (): ThunkAction<Promise<void>, RootState, unknown, ActionType> => async (dispatch: any, getState) => {
    const data = await toDoListsApi.getToDoLists()
    if (getState().auth.login) {
        dispatch(setToDoLists(data.data))
    }
}

export const createToDOList = (title: string): ThunkAction<Promise<void>, RootState, unknown, ActionType> => async (dispatch) => {
    const data = await toDoListsApi.saveToDoList(title)
    if(data.data.resultCode === 0){
        dispatch(getToDoLists())
    }
}


export const createTask = (todolistId: TaskType, taskId: string): ThunkAction<Promise<unknown>, RootState, unknown, ActionType> => async () => {
    return toDoListsApi.addTask(todolistId, taskId)
}

export const updateStatusTask = (todolistId: string, taskId: string, objSend: UpdateStatusTaskType): ThunkAction<Promise<unknown>, RootState, unknown, ActionType> => async () => {
    return toDoListsApi.updateStatusTask(todolistId, taskId, objSend)
}

export const deleteTodoList = (toDoList: string): ThunkAction<Promise<void>, RootState, unknown, ActionType> => async (dispatch) => {
    const res = await toDoListsApi.deleteToDoList(toDoList)
    if(res.data.resultCode === 0){
        dispatch(getToDoLists())
    }
}