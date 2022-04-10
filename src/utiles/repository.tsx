import { ILogin, IProject } from "../interfaces/data/objects";
import { api } from "./baseUrl";
const login = async (data: ILogin) => {
  return await api.post("/user/login", data);
};
const register = async (data: ILogin) => {
  return await api.post("/user/register", data);
};
const projects = async (token: String) => {
   return await api.get("/projects", {},{
    headers: { Authorization: `Bearer ${token}` },
  });
};
const AddProject = async (data: IProject, token: String) => {
  return await api.post("/projects", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const updateProject = async (data: IProject, token: String) => {
  return await api.put("/projects", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const UpdateProjectArchived = async (data: IProject, token: String) => {
  return await api.post("/projects/archived", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const UpdateProjectCompleted = async (data: IProject, token: String) => {
  return await api.post("/projects/completed", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const repository = {
  login,
  register,
  projects,
  AddProject,
  updateProject,
  UpdateProjectArchived,
  UpdateProjectCompleted,
};
