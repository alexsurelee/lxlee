import { loadMdx } from "react-router-mdx/server";
import { Shell } from "~/ui/shell";
import { useMdxComponent, useMdxAttributes } from "react-router-mdx/client";
import { getAllPosts } from "~/utils/posts";
import { useLoaderData } from "react-router";

export function meta({ data }: { data: any }) {
  const attributes = data?.attributes;
  if (!attributes) {
    return [
      { title: "Blog | lxlee" },
      { name: "description", content: "Blog post" },
    ];
  }
  return [
    { title: `${attributes.title} | lxlee` },
    { name: "description", content: `Blog post: ${attributes.title}` },
  ];
}

export async function loader({ request }: { request: Request }) {
  const mdxData = await loadMdx(request);
  const posts = await getAllPosts();
  return { ...mdxData, posts };
}

export default function BlogPost() {
  const Component = useMdxComponent();
  const attributes = useMdxAttributes();
  const { posts } = useLoaderData<typeof loader>();

  const displayDate = new Date(attributes.date).toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Shell
      supplementary={<div>Blog Sidebar</div>}
      date={displayDate}
      posts={posts}
    >
      <article>
        <h1>{attributes.title}</h1>
        <p>
          <em>By {attributes.author}</em>
        </p>
        <Component />
      </article>
    </Shell>
  );
}
