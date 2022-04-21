import { LoginType } from "../types/types"
import { instance } from "./api"

export const loginApi = {
    login(data: LoginType){
        return instance.post('/auth/login', data).then(res => res.data)
    },
    loginOut(){
        return instance.delete('/auth/login').then(res => res.data)
    },
    me(){
        return instance.get('auth/me').then(res => res.data)
    }
}