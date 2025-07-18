import styles from "./shell.module.css";
import { Sidebar } from "../sidebar";
import { Link } from "react-router";
import type { BlogPost } from "~/utils/posts";

export function Shell({
  children,
  supplementary,
  date,
  posts,
  readingTime,
}: {
  children: React.ReactNode;
  supplementary: React.ReactNode;
  date?: string;
  posts?: BlogPost[];
  readingTime?: string;
}) {
  const displayDate =
    date ||
    new Date().toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const displayInfo = readingTime || "Auckland";

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.mastheadLink}>
          <h1 className={styles.masthead}>Alexander Lee</h1>
        </Link>
        <div className={styles.paperInfo}>
          <span>Vol. 1 No. 1</span>
          <span>{displayDate}</span>
          <span>
            {readingTime
              ? `Reading: ${displayInfo}`
              : `Published from ${displayInfo}`}
          </span>
        </div>
      </header>
      <Sidebar posts={posts} />
      <div className={styles.main}>{children}</div>
      <div className={styles.supplementary}>{supplementary}</div>
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Alexander Lee. All rights reserved.</p>
        <p>Printed with care for our valued readers.</p>
      </div>
    </div>
  );
}
