"use client";

import { useState } from "react";
import useCars from "../../../hooks/useCars";
import CatalogList from "./CatalogList";
import CatalogFilters from "../CatalogFilters/CatalogFilters";
import styles from "./Catalog.module.css"
export default function Catalog() {

    const [brand, setBrand] = useState(""); 
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [minMileage, setMinMileage] = useState<number | undefined>(undefined);
    const [maxMileage, setMaxMileage] = useState<number | undefined>(undefined);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars({
      brand: brand || undefined,
      price: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined
  });

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
      <section className={ styles.catalog}>
          <CatalogFilters
              onBrandChange={setBrand}
              onPriceChange={setPrice}
              onMinMileageChange={setMinMileage}
              onMaxMileageChange={setMaxMileage}
          />

      <CatalogList cars={cars} />

      {hasNextPage && (
              <button
                  className={styles.loadMore}
                  type="button"
                  onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}