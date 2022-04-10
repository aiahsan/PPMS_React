import { ILogin } from "../../../interfaces/data/objects";
import { types } from "../../actionTypes";

export const userReducer = (
  state = null,
  action: {
    payload: null | ILogin;
    type: string;
  }
) => {
  if (action.type === types.login) {
    return action.payload;
  } else if (action.type === types.logOut) {
    return null;
  }
  return state;
};
