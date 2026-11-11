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

const iconList: Record<string, string> = {
  arrowTop: "/sprite.svg#icon-arrowtop",
  arrowDown: "/sprite.svg#icon-arrowdown",
};

function Icon({ name }: { name: keyof typeof iconList }) {
  return (
    <svg className={styles.icon} aria-hidden="true">
      <use href={iconList[name]} />
    </svg>
  );
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
  const [isBrandOpen, setBrandOpen] = useState(false);
  const [isPriceOpen, setPriceOpen] = useState(false);

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
    (_, index) => data.price.min + index * 10,
  );

  return (
    <section className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Car brand</label>

        <div className={styles.customSelect}>
          <button
            type="button"
            className={styles.selectButton}
            onClick={() => setBrandOpen((prev) => !prev)}
            aria-expanded={isBrandOpen}
          >
            <span>{brand || "Choose a brand"}</span>
            <Icon name={isBrandOpen ? "arrowTop" : "arrowDown"} />
          </button>

          {isBrandOpen && (
            <ul className={styles.dropdown}>
              {data.brands.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={styles.dropdownOption}
                    onClick={() => {
                      setBrand(item);
                      setBrandOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Price / 1 hour</label>

        <div className={styles.customSelect}>
          <button
            type="button"
            className={styles.selectButton}
            onClick={() => setPriceOpen((prev) => !prev)}
            aria-expanded={isPriceOpen}
          >
            <span>{price ? `$${price}` : "Choose a price"}</span>
            <Icon name={isPriceOpen ? "arrowTop" : "arrowDown"} />
          </button>

          {isPriceOpen && (
            <ul className={styles.dropdown}>
              {prices.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={styles.dropdownOption}
                    onClick={() => {
                      setPrice(String(item));
                      setPriceOpen(false);
                    }}
                  >
                    ${item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
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
