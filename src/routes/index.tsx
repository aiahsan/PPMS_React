import Loader from "../components/loader";
import { useSelector } from "react-redux";
import { IReduxStore } from "../interfaces/data/reduxStore";
import Toast from "../components/toast";
import Projects from "../screens/projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../screens/dashboard";
import Project from "../screens/project";
import Login from "../screens/login";
import Register from "../screens/register";

export default function App() {
  const User = useSelector((x: IReduxStore) => x.User);
  const Loading = useSelector((x: IReduxStore) => x.Loading);
  const Message = useSelector((x: IReduxStore) => x.Message);

  return (
    <>
        
      <BrowserRouter>
        <Routes>
          {User !== null ? (
            <Route>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard/projects" element={<Projects />} />
              <Route path="/dashboard/projects/:type" element={<Projects />} />
              <Route path="/dashboard/new" element={<Project />} />
            </Route>
          ) : (
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
      {Loading === true ? <Loader /> : <></>}
       
      {Message != null ? <Toast message={Message} /> : <></>}
    </>
  );
}
