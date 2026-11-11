import Link from "next/link";
import Image from "next/image";
import type { Car } from "../../../types/car";
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
          sizes="244px"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>

          <p className={styles.price}>${car.rentalPrice}</p>
        </div>

        <ul className={styles.description}>
          <li>{car.location.city}</li>
          <li>{car.location.country}</li>
          <li>{car.rentalCompany}</li>
          <li>{car.type}</li>
          <li>{car.mileage} km</li>
        </ul>
      </div>
      <Link
        className={styles.button}
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </article>
  );
}
