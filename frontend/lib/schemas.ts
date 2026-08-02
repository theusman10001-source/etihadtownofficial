interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
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
}

export function organizationSchema(data: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: {
      "@type": "PostalAddress",
      ...data.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...data.geo,
    },
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
      item: item.url,
    })),
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
