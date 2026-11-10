import { RefObject } from "react";
import type { Car } from "../../../types/car";
import CarCard from "../CarCard/CarCard";
import styles from "./CatalogList.module.css";

interface CatalogListProps {
  cars: Car[];
  firstNewCarRef: RefObject<HTMLLIElement | null>;
  firstNewCarIndex: number;
}

export default function CatalogList({
  cars,
  firstNewCarRef,
  firstNewCarIndex}: CatalogListProps) {
  return (
    <ul className={styles.list}>
      {cars.map((car, index ) => (
        <li
          key={car.id}
          className={styles.item}
          ref={index === firstNewCarIndex ? firstNewCarRef : undefined}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}