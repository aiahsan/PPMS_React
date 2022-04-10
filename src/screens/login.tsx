import { Form, Formik } from "formik";
import { DisplayingErrorMessagesLoginSchema } from "../utiles/ErrorSchema";
import { ILogin } from "../interfaces/data/objects";
import Textbox from "../components/fields/textbox";
import { useDispatch } from "react-redux";
import { LoginAction } from "../redux/actionMethodes/user";
import { useNavigate } from "react-router-dom";
import {repository} from '../utiles/repository'
import { loadingAction } from "../redux/actionMethodes/loader";
import { messageAction } from "../redux/actionMethodes/message";
import jwt_decode from "jwt-decode";

function Login() {
  const disptach = useDispatch();
  let navigate = useNavigate();

  const PostData = async (values: ILogin) => {

      try{
      disptach(loadingAction(true));
      const {status,data}:any= await repository.login(values).then(x=>x); 
      if(status==200 && data?.success==true) 
       {
        disptach(loadingAction(false));
        disptach(messageAction({
          type:1,
           message:data?.message
        }))
        const decoded:any=jwt_decode(data?.data?.token);
        disptach(LoginAction({ ...decoded, token: data?.data?.token }));
        navigate('/');
       }
       else
       {
        disptach(loadingAction(false));
        disptach(messageAction({
          type:1, 
          message:data?.message
        }))
       }
    }
    catch(e)
    {
      disptach(loadingAction(false));
      disptach(messageAction({
        type:0,
        message:e as string
      }))

    }
   
  };
  return (
    <div className="container bx-login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={DisplayingErrorMessagesLoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await PostData(values);
        }}
      >
        {({ errors, touched, getFieldProps, handleSubmit }) => {
          return (
            <div className="login-form">
              <h3 className="text-center mb-2">Welcome Back</h3>
              <h5 className="text-center mb-4">
                Enter Your Email and Password
              </h5>
              <Form className="d-flex flex-column jusify-content-center align-items-center w-100">
                <Textbox
                label="Email"
                  getFieldProps={getFieldProps}
                  feildName="email"
                  touched={touched.email}
                  error={errors.email}
                  placeholder="Input Email"
                  type="input"
                />
                <Textbox
                label="Password"
                  getFieldProps={getFieldProps}
                  feildName="password"
                  touched={touched.password}
                  error={errors.password}
                  placeholder="Input Password"
                  type="password"
                />
                <button type="submit" className="btn btn-info w-100">
                  Login
                </button>
                <a onClick={()=>{
                  navigate('/register')
                }} className="mt-2">Don't have an account register now</a>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
