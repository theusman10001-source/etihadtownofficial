import { groq } from "next-sanity";
import { client, safeFetch } from "./sanity";
import { blogPosts, getBlogPostBySlug, type BlogPost } from "./blog-posts";

export const blogPostsQuery = groq`
  *[_type == "blog" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "image": mainImage.asset->url,
    publishedAt,
    author,
    categories
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "image": mainImage.asset->url,
    body,
    publishedAt,
    author,
    categories
  }
`;

export const mediaGalleryQuery = groq`
  *[_type == "media"] | order(_createdAt desc) {
    _id,
    title,
    mediaType,
    "image": coalesce(image.asset->url, imagePath),
    "imageAlt": coalesce(image.alt, title),
    videoUrl,
    description,
    tags
  }
`;

export async function getBlogPosts() {
  const c = client;
  if (!c) return blogPosts.map(toSaneShape);
  const result = await safeFetch(() => c.fetch(blogPostsQuery));
  if (!result || result.length === 0) return blogPosts.map(toSaneShape);
  return result;
}

export async function getBlogPost(slug: string) {
  const c = client;
  const local = getBlogPostBySlug(slug);
  if (!c) {
    if (!local) return null;
    return { ...toSaneShape(local), body: local.body };
  }
  const result = await safeFetch(() => c.fetch(blogPostBySlugQuery, { slug }));
  if (result) return result;
  if (local) return { ...toSaneShape(local), body: local.body };
  return null;
}

function toSaneShape(post: BlogPost) {
  return {
    _id: post.slug,
    title: post.title,
    slug: { current: post.slug },
    excerpt: post.excerpt,
    image: post.image,
    publishedAt: post.publishedAt,
    author: "Etihad Town",
    categories: post.categories,
  };
}

export async function getMedia() {
  const c = client;
  if (!c) return null;
  return safeFetch(() => c.fetch(mediaGalleryQuery));
}
