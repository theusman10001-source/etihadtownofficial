interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  sameAs?: string[];
  foundingDate?: string;
  areaServed?: string[];
  priceRange?: string;
}

export function organizationSchema(data: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": `${data.url}/#organization`,
    name: data.name,
    alternateName: "Etihad Real Estate",
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    ...(data.email ? { email: data.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...data.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...data.geo,
    },
    logo: absoluteUrl("/images/etihad-logo.png"),
    image: absoluteUrl("/images/hero-banner.webp"),
    ...(data.sameAs ? { sameAs: data.sameAs } : {}),
    ...(data.foundingDate ? { foundingDate: data.foundingDate } : {}),
    ...(data.areaServed
      ? {
          areaServed: data.areaServed.map((a) => ({
            "@type": "City",
            name: a,
          })),
        }
      : {}),
    ...(data.priceRange ? { priceRange: data.priceRange } : {}),
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function blogPosting(data: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.headline,
    description: data.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url,
    },
    ...(data.image ? { image: data.image } : {}),
    ...(data.datePublished ? { datePublished: data.datePublished } : {}),
    author: {
      "@type": "Organization",
      name: data.author || "Etihad Town",
    },
    publisher: {
      "@type": "Organization",
      name: "Etihad Town",
    },
  };
}

export function realEstateListing(plot: {
  name: string;
  description: string;
  url: string;
  image: string;
  price: number;
  priceCurrency: string;
  area: { value: number; unit: string };
  address: string;
  availability: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: plot.name,
    description: plot.description,
    url: plot.url,
    image: plot.image,
    price: plot.price,
    priceCurrency: plot.priceCurrency,
    floorSize: {
      "@type": "QuantitativeValue",
      value: plot.area.value,
      unitCode: plot.area.unit === "marla" ? "E48" : "SQFT",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: plot.address,
    },
    availability: plot.availability,
  };
}

const availabilityMap: Record<string, string> = {
  Available: "https://schema.org/InStock",
  Limited: "https://schema.org/LimitedAvailability",
  "Waiting List": "https://schema.org/PreOrder",
  "Sold Out": "https://schema.org/SoldOut",
};

/**
 * Combines Place + Offer + AggregateOffer for a project/phase detail page so
 * search engines can surface price and availability in rich results.
 */
export function projectListingSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  location: string;
  status: string;
  startingPrice: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["Place", "Product"],
    "@id": `${project.url}#project`,
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressCountry: "PK",
    },
    ...(project.startingPrice > 0
      ? {
          offers: {
            "@type": "Offer",
            price: project.startingPrice,
            priceCurrency: project.currency || "PKR",
            availability: availabilityMap[project.status] || "https://schema.org/InStock",
            url: project.url,
            seller: {
              "@type": "Organization",
              name: "Etihad Town",
            },
          },
        }
      : {}),
  };
}

export function faqPage(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
import { absoluteUrl } from "@/lib/site";
