import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";

export default defineConfig({
  plugins: [
    mdx({ rehypePlugins: [rehypeHighlight] }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
