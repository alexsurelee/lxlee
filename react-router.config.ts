import type { Config } from "@react-router/dev/config";
import { readdir } from "fs/promises";
import { join } from "path";

async function getBlogPaths() {
  const postsDir = join(process.cwd(), "posts");
  const filenames = await readdir(postsDir);
  return filenames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `/posts/${file.replace(".mdx", "")}`);
}

export default {
  ssr: true,
  async prerender() {
    return ["/", ...(await getBlogPaths())];
  },
} satisfies Config;
