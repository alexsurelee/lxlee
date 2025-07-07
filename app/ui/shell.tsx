import styles from "./shell.module.css";
import { Sidebar } from "./sidebar";
import { Link } from "react-router";

export function Shell({
  children,
  supplementary,
  date,
}: {
  children: React.ReactNode;
  supplementary: React.ReactNode;
  date?: string;
}) {
  const displayDate =
    date ||
    new Date().toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const displayPrice = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(1.0);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.mastheadLink}>
          <h1 className={styles.masthead}>THE DAILY CHRONICLE</h1>
        </Link>
        <div className={styles.paperInfo}>
          <span>Vol. 1 No. 1</span>
          <span>{displayDate}</span>
          <span>Price: {displayPrice}</span>
        </div>
      </header>
      <Sidebar />
      <div className={styles.main}>{children}</div>
      <div className={styles.supplementary}>{supplementary}</div>
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Alexander Lee. All rights reserved.</p>
        <p>Printed with care for our valued readers.</p>
      </div>
    </div>
  );
}
