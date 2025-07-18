import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [rehypeHighlight],
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
