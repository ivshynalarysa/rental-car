import styles from "./CatalogLoader.module.css";

export default function CatalogLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <ul className={styles.skeletonList}>
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonButton}></div>
          </li>
        ))}
      </ul>

      <div className={styles.loadingOverlay}>
        <span className={styles.spinner}></span>
        <p className={styles.loadingTitle}>Loading cars...</p>
        <p className={styles.loadingText}>
          Please wait while we fetch the cars for you.
        </p>
      </div>
    </div>
  );
}