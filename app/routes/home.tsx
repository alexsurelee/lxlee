import { Shell } from "~/ui/shell";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: " Alexander Lee | lxlee" },
    { name: "description", content: "Alexander Lee's personal website" },
  ];
}

export default function Home() {
  const currentDate = new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Shell supplementary={<div>Supplementary</div>} date={currentDate}>
      <div>Home</div>
    </Shell>
  );
}
