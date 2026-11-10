
import * as yup from "yup";
import type { BookingData } from "../types/car";

export const bookingSchema: yup.ObjectSchema<BookingData> = yup.object({
    name: yup
        .string()
        .required("Please enter your name.")
        .matches(
        /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
        "Name must contain letters only."
    )
        .min(2, "Name must contain at least 2 characters."),

    email: yup
        .string()
        .required("Please enter your email.")
        .email("Please enter a valid email address."),

    comment: yup
        .string()
        .required("Comment is required."),
});
