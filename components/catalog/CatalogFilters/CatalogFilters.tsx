
"use client";

import { useState } from "react";
import styles from "./Catalog.module.css";
import useCarFilters from "../../../hooks/useCarFilters";

interface CatalogFiltersProps {
  onBrandChange: (brand: string) => void;
  onPriceChange: (price: number | undefined) => void;
  onMinMileageChange: (mileage: number | undefined) => void;
  onMaxMileageChange: (mileage: number | undefined) => void;
}

export default function CatalogFilters({
  onBrandChange,
  onPriceChange,
  onMinMileageChange,
  onMaxMileageChange,
}: CatalogFiltersProps) {
  const { data, isLoading, isError } = useCarFilters();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  if (isLoading) return <p>Loading filters...</p>;
  if (isError || !data) return <p>Failed to load filters.</p>;

  const handleSearch = () => {
    onBrandChange(brand);
    onPriceChange(price ? Number(price) : undefined);
    onMinMileageChange(minMileage ? Number(minMileage) : undefined);
    onMaxMileageChange(maxMileage ? Number(maxMileage) : undefined);
  };

  const handleClear = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");

    onBrandChange("");
    onPriceChange(undefined);
    onMinMileageChange(undefined);
    onMaxMileageChange(undefined);
  };

  const prices = Array.from(
    {
      length: Math.floor((data.price.max - data.price.min) / 10) + 1,
    },
    (_, index) => data.price.min + index * 10
  );

  return (
    <section className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="brand">Car brand</label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Choose a brand</option>
          {data.brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="price">Price / hour</label>
        <select
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Choose a price</option>
          {prices.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Car mileage / km</label>
        <div className={styles.mileageInputs}>
          <input
            type="number"
            min="0"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterActions}>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}
