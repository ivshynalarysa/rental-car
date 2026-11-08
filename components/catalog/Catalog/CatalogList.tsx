import type { Car } from "../../../types/car";
import CarCard from "../CarCard/CarCard";
import styles from "./CatalogList.module.css";

interface CatalogListProps {
  cars: Car[];
}

export default function CatalogList({ cars }: CatalogListProps) {
  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <li key={car.id} className={styles.item}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}