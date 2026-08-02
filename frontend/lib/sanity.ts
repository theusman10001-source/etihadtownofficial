import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: unknown) {
  if (!builder) return null;
  return builder.image(source as never);
}

export async function safeFetch<T>(fetcher: () => Promise<T>): Promise<T | null> {
  if (!client) return null;
  try {
    return await fetcher();
  } catch {
    return null;
  }
}
