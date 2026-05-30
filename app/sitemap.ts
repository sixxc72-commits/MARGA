import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/members", "/characters", "/gallery", "/ranking", "/about", "/download"];
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7
  }));
}
