"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarFilters } from "../lib/cars";

export default function useCarFilters() {
  return useQuery({
    queryKey: ["carFilters"],
    queryFn: getCarFilters,
  });
}