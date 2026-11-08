
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.navLink}>
        Home
      </Link>

      <Link href="/catalog" className={styles.navLink}>
        Catalog
      </Link>
    </nav>
  );
}
