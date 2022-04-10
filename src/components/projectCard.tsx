import React from "react";
import { Form } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IProject, ItechStacks } from "../interfaces/data/objects";
import DotDropdown from "./dropdown";
export default ({
  data,
  onEdit,
  onComplete,
  onArchived,
}: {
  data: IProject;
  onEdit: (e: IProject) => void;
  onArchived: (e: IProject) => void;
  onComplete: (e: IProject) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="Project-card mx-2">
        <div className="img-cntr" style={{backgroundImage:`url(${data?.image})`}}>
        
        </div>
      <h6>Name: {data.projectName}</h6>
      <h6 className="descfd">Description: <span >{data.description}</span></h6>

      {
        <h6 className="flex-wrap d-flex">
          {" "}
          Stack Tags:{" "}
          {Array.isArray(data.techStacks)
            ? data.techStacks.map((y) => <span>{y}</span>)
            : ""}
        </h6>
      }
      <Form.Check
        onClick={() => onComplete(data)}
        checked={data?.isCompleted || false}
        type={"checkbox"}
        label={`Mark as complete`}
      />
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          onClick={() => {
            window.open(data?.liveUrl);
          }}
          className="btn btn-info"
        >
          Visit Live Url
        </button>
        <button
          onClick={() => {
            window.open(data?.githubRepo);
          }}
          className="btn btn-warning"
        >
          Visit Github Url
        </button>
      </div>

      <div className="Project-card-menu">
        <DotDropdown
          values={[
            { value: 1, label: "Edit" },
            {
              value: 2,
              label:
                data && data.isArchived == true ? "Un-Archived" : "Archived",
            },
          ]}
          onChange={(e) => {
            if (e === 1) {
              onEdit(data);
            } else if (e === 2) {
              onArchived(data);
            }
          }}
        >
          <BsThreeDots size={22} color="black" />
        </DotDropdown>
      </div>
    </div>
  );
};
