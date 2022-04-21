import { ThunkAction } from "redux-thunk";
import { loginApi } from "../api/authApi";
import { RootState } from "../store/store";
import { AuthResponse, LoginType } from "../types/types";

let initialState: AuthResponse = {
    id: null,
    email: null,
    login: null
}

type ActionType = ReturnType<typeof setAuth> | ReturnType<typeof setLogOut>


export function reduserAuthMe(state = initialState, action: ActionType) {
    switch (action.type) {
        case "SET_AUTH": {
            return { ...state, ...action.data }
        }
        case "LOG_OUT": {
            return {...state, id: null, email: null, login: null}
        }
        default: return state
    }
}


const setAuth = (data: AuthResponse) => ({ type: "SET_AUTH", data } as const)
const setLogOut = () => ({type: "LOG_OUT"} as const)

export const login = (data: LoginType): ThunkAction<Promise<unknown>, RootState, unknown, ActionType> => async (dispatch) => {
    let res = await loginApi.login(data)
    if(res.resultCode === 0 ){
        dispatch(getAuthData())
    }
}

export const getAuthData = (): ThunkAction<Promise<unknown>, RootState, unknown, ActionType> => async (dispatch) => {
    let data = await loginApi.me()
    if(data.resultCode === 0 ){
        dispatch(setAuth(data.data))
    }
}

export const logOut = (): ThunkAction<Promise<unknown>, RootState, unknown, ActionType> => async (dispatch) => {
    let res = await loginApi.loginOut()
    if(res.resultCode === 0 ){
        dispatch(setLogOut())
    }
}