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

export default function BookingForm({ carId }: BookingFormProps) {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<BookingData>({
  resolver: yupResolver(bookingSchema),
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
      <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Book your car now</h2>
          <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

          <input
        className={styles.input}
        type="text"
        placeholder="Name*"
        {...register("name")}
          />
          
          {errors.name &&
              (<p className={styles.error}>{errors.name.message}</p>
            )}

      <input
        className={styles.input}
        type="email"
        placeholder="Email*"
        {...register("email")}
          />
          
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <textarea
        className={styles.textarea}      
        placeholder="Comment"
        {...register("comment")}
          />
          
          {errors.comment && (
  <p className={styles.error}>{errors.comment.message}</p>
)}

          <button className={styles.submitButton}
              type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}