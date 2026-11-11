import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        href="/"
        prefetch={false}
        aria-label="Rental Cars home"
      >
        <span className={styles.logoIcon} aria-hidden="true">
          <svg width="102" height="16">
            <use href="/sprite.svg#icon-Logo" />
          </svg>
        </span>
      </Link>

      <Navigation />
    </header>
  );
}
