import Image from "next/image";
import type { Car } from "../../../types/car"
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h3>

          <p className={styles.price}>${car.rentalPrice}</p>
        </div>

        <p className={styles.description}>
                  {car.location.city}, {car.location.country}
        </p>
      </div>
    </article>
  );
}