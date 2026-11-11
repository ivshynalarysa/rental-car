"use client";

import { useForm } from "react-hook-form";
import type { BookingData } from "../../types/car";
import useBooking from "../../hooks/useBooking";
import styles from "./BookingForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../lib/bookingSchema";
import toast from "react-hot-toast";

interface BookingFormProps {
  carId: string;
}

function ErrorIcon() {
  return (
    <svg className={styles.errorIcon}>
      <use href="/sprite.svg#icon-exclamation" />
    </svg>
  );
}

export default function BookingForm({ carId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<BookingData>({
    resolver: yupResolver(bookingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useBooking(carId);

  const onSubmit = (data: BookingData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Booking successful!");
        reset();
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>
        Book your car now <br />
        <span className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </span>
      </h2>

      <div
        className={styles.inputWrapper}
        onMouseEnter={() => clearErrors("name")}
      >
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          type="text"
          placeholder="Name*"
          {...register("name")}
        />

        {errors.name && (
          <>
            <ErrorIcon />
            <p className={styles.labelError}>Name*</p>
            <p className={styles.error}>{errors.name.message}</p>
          </>
        )}
      </div>

      <div
        className={styles.inputWrapper}
        onMouseEnter={() => clearErrors("email")}
      >
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          placeholder="Email*"
          {...register("email")}
        />

        {errors.email && (
          <>
            <ErrorIcon />
            <p className={styles.labelError}>Email*</p>
            <p className={styles.error}>{errors.email.message}</p>
          </>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <textarea
          className={`${styles.textarea} ${errors.comment ? styles.inputError : ""}`}
          placeholder="Comment"
          {...register("comment")}
        />

        {errors.comment && (
          <>
            <ErrorIcon />
            <p className={styles.error}>{errors.comment.message}</p>
          </>
        )}
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
