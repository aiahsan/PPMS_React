import { ILogin, IProject } from '../../../interfaces/data/objects'
import {types} from '../../actionTypes'
export const addProject=(payload:IProject)=>{
    return {type:types.Add_Project,payload:payload}
}
export const setProject=(payload:IProject)=>{
     return {type:types.SET_Project,payload:payload}
}
export const setProjects=(payload:IProject[])=>{
    return {type:types.SET_Projects,payload:payload}
}
export const setComplete=(payload:IProject)=>{
    return {type:types.SET_Complete,payload:payload}
}
export const setArchived=(payload:IProject)=>{
    return {type:types.SET_Archived,payload:payload}
}
