import * as Yup from "yup";
export const DisplayingErrorMessagesLoginSchema = Yup.object().shape({
  email: Yup.string().required("Required").email(),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});
export const DisplayingErrorProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  techStacks: Yup.array().required("Required"),
  githubRepo: Yup.string().required("Required"),
  liveUrl: Yup.string().required("Required"),
});
export const DisplayingErrorMessagesRegisterSchema = Yup.object().shape({
  email: Yup.string().required("Required").email(),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  password_confirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
