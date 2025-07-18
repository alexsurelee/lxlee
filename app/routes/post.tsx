import { Shell } from "~/ui/shell";
import { getAllPosts, getReadingTime } from "~/utils/posts";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/post";

// Eagerly import all MDX files at build time so they are available synchronously
const mdxModules = import.meta.glob<{
  default: React.ComponentType;
}>("../../posts/*.mdx", { eager: true });

export function meta({ data }: Route.MetaArgs) {
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

export async function loader({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const attributes = posts.find((post) => post.filename === params.slug);
  if (!attributes) {
    throw new Response("Not Found", { status: 404 });
  }
  const readingTime = await getReadingTime(params.slug);
  return { slug: params.slug, attributes, posts, readingTime };
}

export const links: Route.LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark-dimmed.min.css",
    },
  ];
};

export default function BlogPost() {
  const { slug, attributes, posts, readingTime } =
    useLoaderData<typeof loader>();
  const Component = mdxModules[`../../posts/${slug}.mdx`].default;

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
      readingTime={readingTime}
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
