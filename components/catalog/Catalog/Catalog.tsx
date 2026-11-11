"use client";

import { useState, useRef, useEffect } from "react";
import useCars from "../../../hooks/useCars";
import CatalogList from "./CatalogList";
import CatalogFilters from "../CatalogFilters/CatalogFilters";
import styles from "./Catalog.module.css";
import CatalogLoader from "./CatalogLoader/CatalogLoader";
import NotFoundCar from "../../NotFoundCar/NotFoundCar";

export default function Catalog() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [minMileage, setMinMileage] = useState<number | undefined>(undefined);
  const [maxMileage, setMaxMileage] = useState<number | undefined>(undefined);

  const firstNewCarRef = useRef<HTMLLIElement>(null);
  const previousCarsCountRef = useRef(0);
  const shouldScrollRef = useRef(false);

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
    maxMileage: maxMileage || undefined,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  useEffect(
    function scrollToFirstNewCar() {
      if (
        shouldScrollRef.current &&
        !isFetchingNextPage &&
        cars.length > previousCarsCountRef.current
      ) {
        firstNewCarRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        shouldScrollRef.current = false;
      }
    },
    [cars.length, isFetchingNextPage],
  );

  function handleLoadMore() {
    previousCarsCountRef.current = cars.length;
    shouldScrollRef.current = true;
    fetchNextPage();
  }

  function handleClearFilters() {
    setBrand("");
    setPrice(undefined);
    setMinMileage(undefined);
    setMaxMileage(undefined);
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className={styles.catalog}>
      <CatalogFilters
        onBrandChange={setBrand}
        onPriceChange={setPrice}
        onMinMileageChange={setMinMileage}
        onMaxMileageChange={setMaxMileage}
      />

      <div className={styles.catalogContent}>
        {isLoading ? (
          <CatalogLoader />
        ) : cars.length === 0 ? (
          <NotFoundCar onReset={handleClearFilters} />
        ) : (
          <>
            <CatalogList
              cars={cars}
              firstNewCarRef={firstNewCarRef}
              firstNewCarIndex={
                cars.length - (data?.pages.at(-1)?.cars.length ?? 0)
              }
            />
            {hasNextPage && (
              <div className={styles.loadMoreWrapper}>
                <button
                  className={styles.loadMore}
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? <CatalogLoader /> : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
