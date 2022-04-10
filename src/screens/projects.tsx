import React, { useEffect } from "react";
import ViewP from "./_app";
import { Data, StackOption } from "../utiles/constants";
import { IProject, ItechStacks } from "../interfaces/data/objects";
import ProjectCard from "../components/projectCard";
import Modal from "../components/modal";
import ProjectForm from "../components/projectForm";

import { useDispatch, useSelector } from "react-redux";
import { IReduxStore } from "../interfaces/data/reduxStore";
import _, { filter } from "lodash";
import {
  setArchived,
  setComplete,
  setProject,
  setProjects,
} from "../redux/actionMethodes/projects";
import { useParams } from "react-router-dom";
import { Ifilter } from "../interfaces";
import FilterBar from "../components/filterBar";
import { loadingAction } from "../redux/actionMethodes/loader";
import { repository } from "../utiles/repository";
import { messageAction } from "../redux/actionMethodes/message";
function Projects() {
  const [show, setShow] = React.useState(false);
  const [showA, setShowA] = React.useState(false);
  const disptach = useDispatch();
  const projectsRedux = useSelector((x: IReduxStore) => x.Projects);
  const [_projects, _setProjects] = React.useState<IProject[]>();
  const { type } = useParams();
  const _user = useSelector((x: IReduxStore) => x.User);
  const [_filter, _setFilter] = React.useState<Ifilter>({
    orderByName: 0,
    orderByDate: 0,
    search: "",
    searchStack: [],
  });
  const [selectedData, setSelectedData] = React.useState<
    IProject | undefined
  >();

  useEffect(() => {
    if (projectsRedux.length <= 0) {
      (async () => {
        try {
          disptach(loadingAction(true));
          const { status, data }: any = await repository
            .projects(_user?.token || "")
            .then((x) => x);
          if (status == 200 && data?.success == true) {
            disptach(loadingAction(false));
            disptach(
              messageAction({
                type: 1,
                message: data?.message,
              })
            );
            disptach(setProjects(data?.data));
          } else {
            disptach(loadingAction(false));
            disptach(
              messageAction({
                type: 1,
                message: data?.data?.message,
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
      })();
    }
  }, []);
  useEffect(() => {
    let returnProjects = [...projectsRedux];
    if (_filter.orderByDate == 1) {
      returnProjects = _.orderBy(returnProjects, ["startDate"], ["desc"]);
    } else if (_filter.orderByDate == 2) {
      returnProjects = _.orderBy(returnProjects, ["startDate"], ["asc"]);
    }
    if (_filter.orderByName == 1) {
      returnProjects = _.orderBy(returnProjects, ["projectName"], ["asc"]);
    } else if (_filter.orderByName == 2) {
      returnProjects = _.orderBy(returnProjects, ["projectName"], ["desc"]);
    }

    if (_filter.search.trim() != "") {
      returnProjects = returnProjects.filter((o) =>
        o.projectName.toLowerCase().includes(_filter.search.toLowerCase())
      );
    }
    if (_filter.searchStack.length > 0) {
      returnProjects = returnProjects.filter((x) =>
        (x.techStacks as string[]).some((r: string) =>
          _filter.searchStack.includes(r)
        )
      );
    }

    _setProjects(returnProjects);
  }, [_filter, projectsRedux]);
  const getData = () => {
    if (type && type == "archived") {
      return _projects?.filter((x) => x.isArchived == true) || [];
    } else if (type && type == "completed") {
      return _projects?.filter((x: IProject) => x.isCompleted == true) || [];
    }

    return _projects || [];
  };
  return (
    <ViewP title="">
      <FilterBar _filter={_filter} _setFilter={_setFilter} />
      <div className="d-flex flex-wrap">
        {getData().length > 0 ? (
          getData().map((x: IProject, i: number) => {
            return (
              <ProjectCard
                onComplete={(e: IProject) => {
                  (async () => {
                    try {
                      disptach(loadingAction(true));
                      const { status, data }: any = await repository
                        .UpdateProjectCompleted(
                          {
                            ...e,
                            techStacks: JSON.stringify(e.techStacks),
                          },
                          _user?.token || ""
                        )
                        .then((x) => x);
                      if (status == 200 && data?.success == true) {
                        disptach(loadingAction(false));
                        disptach(
                          messageAction({
                            type: 1,
                            message: data?.message,
                          })
                        );
                        disptach(setProject(data?.data));
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
                  })();
                }}
                onEdit={(e: IProject) => {
                  setSelectedData(e);
                  setShow(true);
                }}
                onArchived={(e: IProject) => {
                  setShowA(true);
                  setSelectedData(e);
                }}
                data={x}
                key={i}
              />
            );
          })
        ) : (
          <h3 className="text-center w-100 my-5">No Projects available</h3>
        )}
      </div>
      <Modal title="Edit Form" show={show} setShow={setShow}>
        <>
          <ProjectForm
            data={selectedData}
            PostData={(values) => {
              (async () => {
                try {
                  disptach(loadingAction(true));
                  const { status, data }: any = await repository
                    .updateProject(
                      {
                        ...values,
                        techStacks: JSON.stringify(values.techStacks),
                      },
                      _user?.token || ""
                    )
                    .then((x) => x);
                  if (status == 200 && data?.success == true) {
                    disptach(loadingAction(false));
                    disptach(
                      messageAction({
                        type: 1,
                        message: data?.message,
                      })
                    );
                    disptach(setProject(data?.data));
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
              })();
            }}
          />
        </>
      </Modal>
      <Modal title="Archived" show={showA} setShow={setShowA}>
        <>
          <p>Are You sure you wan't to archived</p>
          <div className="d-flex flex-row justify-content-end">
            <button onClick={() => setShowA(false)} className="btn btn-info">
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedData) {
                  (async () => {
                    try {
                      disptach(loadingAction(true));
                      const { status, data }: any = await repository
                        .UpdateProjectArchived(
                          {
                            ...selectedData,
                            techStacks: JSON.stringify(selectedData.techStacks),
                          },
                          _user?.token || ""
                        )
                        .then((x) => x);
                      if (status == 200 && data?.success == true) {
                        disptach(loadingAction(false));
                        disptach(
                          messageAction({
                            type: 1,
                            message: data?.message,
                          })
                        );
                        disptach(setProject(data?.data));
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
                  })();
                  setShowA(false);
                }
              }}
              className="btn btn-danger mx-2"
            >
              Confirm
            </button>
          </div>
        </>
      </Modal>
    </ViewP>
  );
}

export default Projects;
