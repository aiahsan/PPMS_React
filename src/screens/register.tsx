import { Form, Formik } from "formik";
import {
   DisplayingErrorMessagesRegisterSchema,
} from "../utiles/ErrorSchema";
import { ILogin } from "../interfaces/data/objects";
import Textbox from "../components/fields/textbox";
import { useDispatch } from "react-redux";
import { LoginAction } from "../redux/actionMethodes/user";
import { useNavigate } from "react-router-dom";
import { loadingAction } from "../redux/actionMethodes/loader";
import { repository } from "../utiles/repository";
import { messageAction } from "../redux/actionMethodes/message";
function Register() {
  const disptach = useDispatch();
  const PostData = async (values: ILogin,resetForm:any) => {
    try{
      disptach(loadingAction(true));
      const {status,data}:any= await repository.register(values).then(x=>x); 
      if(status==200 && data?.success==true) 
       {
        disptach(loadingAction(false));
        disptach(messageAction({
          type:1,
           message:data?.message
        }))
        resetForm()
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

    }  };
  let navigate = useNavigate();

  return (
    <div className="container bx-login">
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={DisplayingErrorMessagesRegisterSchema}
        onSubmit={async (values, { setSubmitting ,resetForm}) => {
          await PostData(values,resetForm);
        }}
      >
        {({ errors, touched, getFieldProps, handleSubmit }) => {
          return (
            <div className="login-form">
              <h3 className="text-center mb-2">Sign Up</h3>
              <h5 className="text-center mb-4">
                Enter Required Fields To Register
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
                label="Full Name"
                  getFieldProps={getFieldProps}
                  feildName="name"
                  touched={touched.name}
                  error={errors.name}
                  placeholder="Input Full Name"
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
                <Textbox
                label="Confirm Password"
                  getFieldProps={getFieldProps}
                  feildName="password_confirmation"
                  touched={touched.password_confirmation}
                  error={errors.password_confirmation}
                  placeholder="Confirm Password"
                  type="password"
                />
                <button type="submit" className="btn btn-info w-100">
                  Register
                </button>
                <a onClick={()=>{
                  navigate('/')
                }} className="mt-2">Already have an account login now!</a>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
