import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "lxlee | Alexander Lee" },
    { name: "description", content: "Alexander Lee's personal website" },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
