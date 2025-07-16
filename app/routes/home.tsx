import { Shell } from "~/ui/shell";
import { getAllPosts } from "~/utils/posts";
import { useLoaderData } from "react-router";
import { Cigarette } from "~/ui/cigarette";
import type { Route } from "./+types/home";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: " Alexander Lee | lxlee" },
    { name: "description", content: "Alexander Lee's personal website" },
  ];
}

export async function loader() {
  const posts = await getAllPosts();
  return { posts };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  const currentDate = new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Shell
      supplementary={
        <div className={styles.supplementary}>
          <Cigarette />
        </div>
      }
      date={currentDate}
      posts={posts}
    >
      <div></div>
    </Shell>
  );
}
