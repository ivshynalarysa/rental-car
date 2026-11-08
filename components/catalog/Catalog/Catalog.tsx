"use client";

import useCars from "../../../hooks/useCars";
import CatalogList from "./CatalogList";

export default function Catalog() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars();

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <section>
      <CatalogList cars={cars} />

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}