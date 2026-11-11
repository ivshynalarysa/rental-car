import Image from "next/image";
import styles from "./NotFoundCar.module.css";

interface NotFoundCarProps {
  onReset: () => void;
}

export default function NotFoundCar({ onReset }: NotFoundCarProps) {
  return (
    <div className={styles.notFound}>
      <Image
        src="/images/notfound.png"
        alt="No cars found"
        width={414}
        height={388}
        className={styles.imageNotFound}
      />

      <h2 className={styles.title}>No cars found</h2>

      <p className={styles.description}>
        We couldn’t find any cars that match your
        <br />
        current filters. Try changing your search
        <br />
        criteria or reset the filters.
      </p>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
