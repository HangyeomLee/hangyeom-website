import Link from "next/link";
import styles from "@/components/home/home.module.css";

export default function NotFound() {
  return (
    <div className={styles.container} style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
      <div className={styles.sectionEyebrow}>404</div>
      <h1 className={styles.sectionTitle}>Page not found</h1>
      <p className={styles.sectionLead} style={{ margin: "0.8rem auto 2rem" }}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className={styles.btnPrimary}>
        Back to home
      </Link>
    </div>
  );
}
