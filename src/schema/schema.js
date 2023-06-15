import * as yup from "yup";

const mobile = /^5\d{8}$/;

export const basicSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
  }),
  phone: yup
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .matches(mobile, { message: "Please enter valid phone number" })
    .required("Phone is required"),
});
