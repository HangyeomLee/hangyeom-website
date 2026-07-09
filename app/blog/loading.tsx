import styles from "@/components/blog/blog.module.css";

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.skeletonTitle} />
      <div className={styles.list}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </div>
  );
}
