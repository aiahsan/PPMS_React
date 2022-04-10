import React from "react";
import { Itexbox } from "../../interfaces/fields/Itextbox";
export default function App ({
  getFieldProps,
  touched,
  error,
  feildName,
  placeholder,
  type,
  label
}: Itexbox) {
  return (
    <div className="field-box">
      <h6>{label}</h6>
      {
        type!=="textarea"?<input
        {...getFieldProps(feildName)}
        type={type}
        placeholder={placeholder}
      />:<textarea {...getFieldProps(feildName)}
       placeholder={placeholder}></textarea>
      }
      
      {touched && error && <p>{error}</p>}
    </div>
  );
};
