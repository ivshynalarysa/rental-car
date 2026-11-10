import styles from "./CatalogLoader.module.css";

export default function CatalogLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingCard}>
          <span className={styles.spinner}></span>

          <p className={styles.loadingTitle}>Loading cars...</p>

          <p className={styles.loadingText}>
            Please wait while we fetch the best <br/> cars for you.
          </p>
        </div>
      </div>
    </div>
  );
}