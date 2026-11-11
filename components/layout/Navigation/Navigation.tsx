"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const pathName = usePathname();

  return (
    <nav className={styles.navigation}>
      <Link
        href="/"
        className={`${styles.navLink} ${pathName === "/" ? styles.active : ""}`}
      >
        Home
      </Link>

      <Link
        href="/catalog"
        className={`${styles.navLink} ${
          pathName === "/catalog" ? styles.active : ""
        }`}
      >
        Catalog
      </Link>
    </nav>
  );
}
