"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarById } from "../lib/cars";

export default function useCarById(id: string) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    enabled: Boolean(id),
  });
}
