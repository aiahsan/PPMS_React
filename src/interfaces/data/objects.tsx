export interface ILogin {
  email: string;
  password: string;
  token?: string;
  name?:string;
}
 
export interface ItechStacks {
  label:string,
  value:string
}
export interface IProject {
  id:number | string;
  projectName: string;
  description: string;
  startDate: string;
  image: string;
  techStacks: ItechStacks[]| any[] | string;
  githubRepo: string;
  liveUrl: string;
  isArchived?: boolean;
  isCompleted?: boolean;
  craetedAt: Date;
}
