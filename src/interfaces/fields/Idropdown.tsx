import { FieldInputProps } from "formik/dist/types";

 
export interface IDropddown{
    children?:
      | React.ReactChild
      | React.ReactChild[];
    onChange:(e:number | string)=>void;
    values:IDropddownValue[]
}
export interface IDropddownValue{
    value:number | string,
    label:string
}