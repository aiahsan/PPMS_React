import { ILogin } from '../../../interfaces/data/objects'
import {types} from '../../actionTypes'

export const loadingAction=(payload:boolean)=>{
    return {type:types.set_Loading,payload}
}
