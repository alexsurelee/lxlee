import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

/**
 * Represents a blog post with its metadata.
 */
export interface BlogPost {
  /** The title of the blog post */
  title: string;
  /** The author of the blog post */
  author: string;
  /** The publication date of the blog post */
  date: string;
  /** The filename of the blog post (without extension) */
  filename: string;
}

/**
 * Extracts plain text content from MDX markup by removing all formatting,
 * code blocks, JSX expressions, HTML tags, and markdown syntax.
 *
 * @param mdxContent - The raw MDX content string to process
 * @returns The plain text content with all markup removed and whitespace normalized
 *
 * @example
 * ```typescript
 * const mdx = "# Hello **World**\n```js\nconsole.log('test')\n```\nSome text";
 * const plainText = extractPlainText(mdx);
 * // Returns: "Hello World Some text"
 * ```
 */
export function extractPlainText(mdxContent: string): string {
  return mdxContent
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/\{[^}]*\}/g, "") // Remove JSX expressions
    .replace(/<([^>]+)>([^<]*)<\/\1>/g, "$2") // Extract content from paired tags
    .replace(/<[^>]*\/>/g, "") // Remove self-closing tags
    .replace(/<[^<>]*>/g, "") // Remove closed tags
    .replace(/<[^<>\s]+(?:\s[^<>]*?)?(?=\s+\w|\s*$|[^>]*$)/g, "") // Remove unclosed tags
    .replace(/#{1,6}\s/g, "") // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
    .replace(/[^\w\s]/g, " ") // Remove other special characters
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/**
 * Calculates the estimated reading time for a blog post based on word count.
 * Assumes an average reading speed of 200 words per minute.
 *
 * @param filename - The filename of the blog post (without .mdx extension)
 * @returns A promise that resolves to a formatted reading time string (e.g., "1 min" or "5 mins")
 * @throws Will throw an error if the file cannot be read or parsed
 *
 * @example
 * ```typescript
 * const readingTime = await getReadingTime("my-blog-post");
 * // Returns: "3 mins"
 * ```
 */
export async function getReadingTime(filename: string): Promise<string> {
  const postsDirectory = join(process.cwd(), "posts");
  const filePath = join(postsDirectory, `${filename}.mdx`);
  const fileContents = await readFile(filePath, "utf8");
  const { content } = matter(fileContents);

  const plainText = extractPlainText(content);

  const wordCount = plainText
    .split(" ")
    .filter((word) => word.length > 0).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200); // ~200 words per minute

  return readingTimeMinutes === 1 ? "1 min" : `${readingTimeMinutes} mins`;
}

/**
 * Retrieves all blog posts from the posts directory and returns them with their metadata.
 * Only processes files with .mdx extension and extracts frontmatter data.
 *
 * @returns A promise that resolves to an array of BlogPost objects sorted by date (newest first)
 * @throws Will throw an error if the posts directory cannot be read or if frontmatter parsing fails
 *
 * @example
 * ```typescript
 * const posts = await getAllPosts();
 * // Returns: [
 * //   { title: "Latest Post", author: "John", date: "2024-01-15", filename: "latest-post" },
 * //   { title: "Older Post", author: "Jane", date: "2024-01-10", filename: "older-post" }
 * // ]
 * ```
 */
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
