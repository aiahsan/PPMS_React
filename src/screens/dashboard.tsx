 import { useDispatch, useSelector } from 'react-redux';
import { LogOutAction } from '../redux/actionMethodes/user';
import { useNavigate } from "react-router-dom";

import ViewP from './_app';
import { IReduxStore } from '../interfaces/data/reduxStore';
export default function Dashboard(){
    let navigate = useNavigate();

    const User=useSelector((x:IReduxStore)=>x.User)

    const dispatch=useDispatch();
    return <ViewP title=''>
        <div className='d-flex justify-content-between'>
        <h3>Welcome {User?.name}</h3>
         <button className='btn btn-danger' onClick={()=>{
             dispatch(LogOutAction());
             navigate(`/`);
         }}>Log Out</button>
        </div>
    </ViewP>
}