import { ILogin } from '../../../interfaces/data/objects'
import {types} from '../../actionTypes'
export const LogOutAction=()=>{
    return { type: types.logOut, payload: null }    
}
export const LoginAction=(payload:ILogin)=>{
    return {type:types.login,payload:payload}
}
