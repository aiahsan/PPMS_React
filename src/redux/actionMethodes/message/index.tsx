import { ILogin } from "../../../interfaces/data/objects";
import { IMessage } from "../../../interfaces/data/reduxStore";
import { types } from "../../actionTypes";

export const messageAction = (payload?: IMessage | undefined) => {
  return { type: types.set_Message, payload:payload || null };
};
