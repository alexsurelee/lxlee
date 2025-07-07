import styles from "./sidebar.module.css";
import { Link } from "react-router";
import type { BlogPost } from "~/utils/posts";

export function Sidebar({ posts }: { posts?: BlogPost[] }) {
  return (
    <div className={styles.sidebar}>
      <h2>Latest Articles</h2>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.filename}>
              <Link to={`/posts/${post.filename}`} className={styles.postLink}>
                <h3>{post.title}</h3>
                <p>By {post.author}</p>
                <p>{new Date(post.date).toLocaleDateString("en-NZ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
}
