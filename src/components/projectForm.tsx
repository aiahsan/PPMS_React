//@ts-ignore
import ImageUploader from "react-image-upload";
import { Form, Formik } from "formik";
import { DisplayingErrorProjectSchema } from "../utiles/ErrorSchema";
import Textbox from "../components/fields/textbox";
import Select from "react-select";
import "react-image-upload/dist/index.css";
import { IProject, ItechStacks } from "../interfaces/data/objects";
import { StackOption } from "../utiles/constants";
import moment from "moment";

export default ({
  data,
  PostData,
}: {
  data?: IProject;
  PostData: (values: IProject) => void;
}) => {
  function getImageFileObject(imageFile: any) {
    console.log({ imageFile });
  }
  function runAfterImageDelete(file: any) {}
   return (
    <div>
      <Formik
        initialValues={{
          projectName: data?.projectName || "",
          description: data?.description || "",
          startDate: moment(data?.startDate ).format("yyyy-MM-DDThh:mm:ss")|| "",
          image: data?.image || "",
          techStacks: data?.techStacks as ItechStacks[] |[],
          githubRepo: data?.githubRepo || "",
          liveUrl: data?.githubRepo || "",
          isArchived: data?.isArchived || false,
          isCompleted: data?.isCompleted || false,
          id: data?.id || Date(),
          craetedAt: data?.craetedAt || new Date(),
        }}
        validationSchema={DisplayingErrorProjectSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await PostData(values);
        }}
      >
        {({
          errors,
          touched,
          getFieldProps,
          handleSubmit,
          setFieldValue,
          initialValues,
        }) => {
          return (
            <div className="login-form">

              <Form className="d-flex flex-column jusify-content-center align-items-center w-100">
                <Textbox
                  label="Project Name"
                  getFieldProps={getFieldProps}
                  feildName="projectName"
                  touched={touched.projectName}
                  error={errors.projectName}
                  placeholder="Input Project Name"
                  type="input"
                />
                <Textbox
                  label="Description"
                  getFieldProps={getFieldProps}
                  feildName="description"
                  touched={touched.projectName}
                  error={errors.projectName}
                  placeholder="Input description"
                  type="textarea"
                />
                <Textbox
                  label="Start Date"
                  getFieldProps={getFieldProps}
                  feildName="startDate"
                  touched={touched.startDate}
                  error={errors.startDate}
                  placeholder="Select Start Date"
                  type="datetime-local"
                />

                <Textbox
                  label="Github Repo Link"
                  getFieldProps={getFieldProps}
                  feildName="githubRepo"
                  touched={touched.startDate}
                  error={errors.startDate}
                  placeholder="Input Git Hub Repo Link"
                  type="input"
                />
                <Textbox
                  label="Live URL"
                  getFieldProps={getFieldProps}
                  feildName="liveUrl"
                  touched={touched.startDate}
                  error={errors.startDate}
                  placeholder="Input Live URL"
                  type="input"
                />
                <div className="w-100">
                  <h6>Tech Stacks</h6>
                  <Select
                    isMulti={true}
                    className="w-100 mb-2"
                    options={StackOption}
                    defaultValue={ data && data.techStacks && Array.isArray(data.techStacks) ? data.techStacks.map((x) => {
                      return {
                        label: x,
                        value: x,
                      };
                    }):[]}
                    onChange={(option, actionMeta) => {
                      setFieldValue(
                        "techStacks",
                        option.map((x) => x.label)
                      );
                    }}
                  />
                  {touched.techStacks && errors.techStacks && (
                    <p>{errors.techStacks}</p>
                  )}
                </div>

                <Textbox
                  label="Image"
                  getFieldProps={getFieldProps}
                  feildName="image"
                  touched={touched.image}
                  error={errors.image}
                  placeholder="Input Image"
                  type="input"
                />
                <button type="submit" className="btn btn-info w-100">
                  {data ? "Save" : "Add New Project"}
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
