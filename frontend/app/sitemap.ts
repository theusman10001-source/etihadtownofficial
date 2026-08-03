import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/sanity.queries";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

const projectImages: Record<string, string> = {
  "phase-1": "/images/phase-1.webp",
  "phase-2": "/images/phase-2.webp",
  "phase-3": "/images/phase-3.webp",
  "phase-4": "/images/phase-4.webp",
  "premier-enclave": "/images/premier-enclave.webp",
  sialkot: "/images/sialkot.webp",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/images/hero-banner.webp")],
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [absoluteUrl("/images/project-image.webp")],
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/media"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
    images: [absoluteUrl(projectImages[project.slug])],
  }));

  const blogRoutes: MetadataRoute.Sitemap = (posts || []).map((post: {
    slug: { current: string };
    publishedAt?: string;
    image?: string;
  }) => ({
    url: absoluteUrl(`/blog/${post.slug.current}`),
    lastModified: post.publishedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    ...(post.image ? { images: [absoluteUrl(post.image)] } : {}),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
