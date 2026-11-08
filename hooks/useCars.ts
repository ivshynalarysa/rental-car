
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "../lib/cars";
import type { GetCarsParams } from "../lib/cars";

const PER_PAGE = 12;

export default function useCars(filters: Omit<GetCarsParams, "page" | "limit"> = {}) {
  return useInfiniteQuery({
    queryKey: ["cars", filters],

    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        page: pageParam,
        perPage: PER_PAGE,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
}
