import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

export interface BlogPost {
  title: string;
  author: string;
  date: string;
  filename: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDirectory = join(process.cwd(), "posts");
  const filenames = await readdir(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const filePath = join(postsDirectory, filename);
        const fileContents = await readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          title: data.title,
          author: data.author,
          date: data.date,
          filename: filename.replace(".mdx", ""),
        };
      })
  );

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
