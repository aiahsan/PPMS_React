import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { IDropddown, IDropddownValue } from "../interfaces/fields/Idropdown";
export default ({ onChange, values, children }: IDropddown) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <>{children}</>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          values.map((x:IDropddownValue)=><Dropdown.Item onClick={()=>onChange(x.value)} >{x.label}</Dropdown.Item>
          )
        }
         
      </Dropdown.Menu>
    </Dropdown>
  );
};
