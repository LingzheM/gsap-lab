import Link from "next/link";
import styles from './BackLink.module.css';

export function BackLink() {
  return (
    <Link href="/" className={styles.back}>
      ← Lab
    </Link>
  )
}