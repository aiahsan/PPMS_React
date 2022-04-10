 import { types } from "../../actionTypes";

export const loadingReducer = (
  state = false,
  action: {
    payload: boolean;
    type: string;
  }
) => {
  if (action.type === types.set_Loading) {
    return action.payload;
  } else if (action.type === types.logOut) {
    return false;
  }
  return state;
};
