import * as yup from "yup";

export const bookingSchema = yup.object({
  name: yup
    .string()
    .required("Please enter your name."),

  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),

  comment: yup
      .string()
      .trim()
    .required("Comment is required."),
});