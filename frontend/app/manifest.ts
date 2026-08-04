import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Etihad Town Lahore",
    short_name: "Etihad Town",
    description:
      "Etihad Town Lahore — master-planned community offering residential and commercial plots across multiple phases with flexible payment plans.",
    start_url: "/",
    display: "standalone",
    background_color: "#081E42",
    theme_color: "#081E42",
    icons: [
      {
        src: "/images/etihad-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
