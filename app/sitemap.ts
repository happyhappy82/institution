import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://www.krgovpolicy.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const policiesDir = path.join(process.cwd(), "content/policies");
  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  if (fs.existsSync(policiesDir)) {
    const files = fs.readdirSync(policiesDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(policiesDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);

      const slug = data.slug || file.replace(/\.md$/, "");
      const lastModified = data.date ? new Date(data.date) : new Date();

      urls.push({
        url: `${SITE_URL}/${slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return urls;
}
