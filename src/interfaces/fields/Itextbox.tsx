import { FieldInputProps } from "formik/dist/types";

 
 export interface Itexbox{
    getFieldProps:<Value = any>(props: any) => FieldInputProps<Value>,
    touched?:boolean,
    error?:string,
    feildName:string,
    placeholder:string,
    type:string,
    label:string
}