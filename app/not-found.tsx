import Link from "next/link";
import styles from "@/components/home/home.module.css";

export default function NotFound() {
  return (
    <div className={styles.container} style={{ padding: "6rem 1.5rem", maxWidth: "620px" }}>
      <h1 className={styles.sectionTitle}>This page isn&apos;t here</h1>
      <p className={styles.sectionLead} style={{ margin: "1rem 0 2rem" }}>
        Either it moved or it never existed. Both happen.
      </p>
      <Link href="/" className={styles.btnPrimary}>
        Back to home
      </Link>
    </div>
  );
}
