import { ILogin, IProject } from "./objects";
export interface IReduxStore {
  User: ILogin | null;
  Loading: boolean;
  Message:IMessage | null;
  Projects:IProject[] | [];
}

export interface IMessage {
  type: number;
  message: string;
}
