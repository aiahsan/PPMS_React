import { IProject } from "../interfaces/data/objects";
import { useDispatch, useSelector } from "react-redux";
import ViewP from "./_app";
import ProjectForm from "../components/projectForm";
import { addProject } from "../redux/actionMethodes/projects";
import { useNavigate } from "react-router-dom";
import { loadingAction } from "../redux/actionMethodes/loader";
import { repository } from "../utiles/repository";
import { IReduxStore } from "../interfaces/data/reduxStore";
import { messageAction } from "../redux/actionMethodes/message";

function Project() {
  const disptach = useDispatch();
  const naviagate = useNavigate();
  const _user = useSelector((x: IReduxStore) => x.User);

  const PostData = async (values: IProject) => {
    try {
      disptach(loadingAction(true));
      const { status, data }: any = await repository
        .AddProject({...values,
          techStacks:JSON.stringify(values.techStacks)
        }, _user?.token || "")
        .then((x) => x);
      if (status == 200 && data?.success == true) {
        disptach(loadingAction(false));
        disptach(
          messageAction({
            type: 1,
            message: data?.message,
          })
        );
        disptach(addProject(data?.data));
        naviagate("/dashboard/projects");
      } else {
        disptach(loadingAction(false));
        disptach(
          messageAction({
            type: 1,
            message: data?.message,
          })
        );
      }
    } catch (e) {
      disptach(loadingAction(false));
      disptach(
        messageAction({
          type: 0,
          message: e as string,
        })
      );
    }
  };

  return (
    <ViewP title="">
      <div className="container bx-login">
        <h1 className="text-center my-5">Add New Project</h1>
        <ProjectForm PostData={PostData} />
      </div>
    </ViewP>
  );
}

export default Project;
