import { IMessage } from "../../../interfaces/data/reduxStore";
import { types } from "../../actionTypes";

export const messageReducer = (
  state = null,
  action: {
    payload: IMessage | null;
    type: string;
  }
) => {
  if (action.type === types.set_Message) {
     return action.payload;
  } 
  else if (action.type === types.logOut) {
    return null;
  }
  return state;
};
