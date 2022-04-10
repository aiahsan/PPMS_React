import { ILogin, IProject } from "../../../interfaces/data/objects";
import { types } from "../../actionTypes";
//@ts-ignore
import update from "react-addons-update";

export const projectReducer = (
  state: IProject[] = [],
  action: {
    payload: null | IProject | IProject[];
    type: string;
  }
) => {
  let payLoad = action?.payload as IProject;
  let index = state.findIndex((x: IProject) => x?.id == payLoad?.id);

  if (action.type === types.Add_Project) {
    let oldData = [...state];
    return [action.payload, ...oldData];
  } else if (action.type === types.SET_Projects) {
    return Array.isArray(action.payload) ? [...action.payload] : [];
  } else if (action.type === types.SET_Project) {
    if (index >= 0) {
      state[index] = payLoad;
      return [...state];
    }
  } else if (action.type === types.SET_Archived) {
    if (index >= 0) {
      payLoad.isArchived = !payLoad.isArchived as boolean | false;

       state[index] = payLoad;
      return [...state];
    }
  } else if (action.type === types.SET_Complete) {
    if (index >= 0) {
      payLoad.isCompleted = !payLoad.isCompleted as boolean | false;
      state[index] = payLoad;
      return [...state];
    }
  }
  return state;
};
