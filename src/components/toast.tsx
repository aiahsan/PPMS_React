import { Toast } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import {IMessage} from '../interfaces/data/reduxStore'
import { messageAction } from "../redux/actionMethodes/message";
export default function App({message}:{message:IMessage }) {
  const dispatch=useDispatch();
  return (
    <Toast onClose={()=>dispatch(messageAction(undefined))}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20"  className="rounded me-2" alt="" />
        <strong className="me-auto">PPMS</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>{message.message}</Toast.Body>
    </Toast>
  );
}
