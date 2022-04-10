import React from "react";
import Navbar from "../components/navbar";
import { RProps } from "../interfaces";
export default ({title,children}:RProps) => {
  return (
    <div>
      <Navbar />
     <div className="container mt-3">
     {children}
     </div>
    </div>
  );
};
