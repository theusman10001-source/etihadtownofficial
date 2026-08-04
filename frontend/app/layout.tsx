import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { organizationSchema } from "@/lib/schemas";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { PageTransition } from "@/components/page-transition";
import { contactPhoneE164 } from "@/lib/contact";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";

const jsonLd = organizationSchema({
  name: "Etihad Town",
  description:
    "Lahore's premier master-planned community offering residential and commercial plots across multiple phases with flexible payment plans.",
  url: siteUrl,
  telephone: contactPhoneE164,
  address: {
    streetAddress: "Etihad Town Phase II, 4km Off Ferozpur Road",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "54000",
    addressCountry: "PK",
  },
  geo: {
    latitude: 31.5204,
    longitude: 74.3587,
  },
  sameAs: [
    "https://www.facebook.com/share/19AzuzCw8h/",
    "https://www.instagram.com/etihadtownofficial",
    "https://www.linkedin.com/company/etihadrealestate/",
    "https://youtube.com/@etihadtown",
  ],
  foundingDate: "2005",
  areaServed: ["Lahore", "Sialkot", "Rahim Yar Khan"],
  priceRange: "Rs. 47.5 Lac – Rs. 13 Crore",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Etihad Town Lahore | Premium Plots & Investment",
    template: "%s | Etihad Town Lahore",
  },
  description:
    "Etihad Town Lahore — master-planned community offering residential and commercial plots across multiple phases. Secure your investment with flexible payment plans.",
  keywords: [
    "Etihad Town Lahore",
    "Etihad Town plots",
    "Etihad Town payment plan",
    "Etihad Town Phase 4",
    "Etihad Town Sialkot",
    "Lahore real estate",
    "plots in Lahore",
    "residential plots Lahore",
    "commercial plots Lahore",
    "5 marla plot Lahore",
    "10 marla plot Lahore",
    "housing society Lahore",
    "Ferozepur Road housing scheme",
    "Etihad Real Estate",
  ],
  openGraph: {
    title: "Etihad Town Lahore | Premium Plots & Investment",
    description:
      "Master-planned community in Lahore. Residential and commercial plots available with flexible payment plans.",
    url: siteUrl,
    siteName,
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/hero-banner.webp"),
        width: 1200,
        height: 630,
        alt: "Etihad Town Lahore — premium residential and commercial plots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etihad Town Lahore | Premium Plots & Investment",
    description:
      "Master-planned community in Lahore. Residential and commercial plots available with flexible payment plans.",
    images: [absoluteUrl("/images/hero-banner.webp")],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#081E42",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-poppins)]">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
