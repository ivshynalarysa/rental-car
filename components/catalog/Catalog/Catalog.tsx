"use client";

import { useState, useRef, useEffect } from "react";
import useCars from "../../../hooks/useCars";
import CatalogList from "./CatalogList";
import CatalogFilters from "../CatalogFilters/CatalogFilters";
import styles from "./Catalog.module.css"
import CatalogLoader from  "../../CatalogLoader/CatalogLoader";


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
      maxMileage: maxMileage || undefined
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
    [cars.length, isFetchingNextPage]
  );

  function handleLoadMore() {
    previousCarsCountRef.current = cars.length;
    shouldScrollRef.current = true;
    fetchNextPage();
  }

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  

  return (
      <section className={ styles.catalog}>
          <CatalogFilters
              onBrandChange={setBrand}
              onPriceChange={setPrice}
              onMinMileageChange={setMinMileage}
              onMaxMileageChange={setMaxMileage}
          />

      <CatalogList
        cars={cars}
        firstNewCarRef={firstNewCarRef}
        firstNewCarIndex={cars.length - (data?.pages.at(-1)?.cars.length ?? 0)}
      />

      

      {hasNextPage && (
              <button
                  className={styles.loadMore}
                  type="button"
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}