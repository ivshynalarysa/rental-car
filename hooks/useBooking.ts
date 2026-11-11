"use client";

import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../lib/cars";
import type { BookingData } from "../types/car";

export default function useBooking(carId: string) {
  return useMutation({
    mutationFn: (bookingData: BookingData) => createBooking(carId, bookingData),
  });
}
