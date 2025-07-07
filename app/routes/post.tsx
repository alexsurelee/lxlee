import { loadMdx } from "react-router-mdx/server";
import { Shell } from "~/ui/shell";
import { useMdxComponent, useMdxAttributes } from "react-router-mdx/client";

export function meta({ data }: { data: any }) {
  const attributes = data?.attributes;
  if (!attributes) {
    return [
      { title: "Blog | lxlee" },
      { name: "description", content: "Blog post" },
    ];
  }
  return [
    { title: `Blog - ${attributes.slug} | lxlee` },
    { name: "description", content: `Blog post: ${attributes.slug}` },
  ];
}

export async function loader({ request }: { request: Request }) {
  return loadMdx(request);
}

export default function BlogPost() {
  const Component = useMdxComponent();
  const attributes = useMdxAttributes();

  const displayDate = new Date(attributes.date).toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Shell supplementary={<div>Blog Sidebar</div>} date={displayDate}>
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
