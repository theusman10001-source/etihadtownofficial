import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { organizationSchema } from "@/lib/schemas";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { PageTransition } from "@/components/page-transition";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://etihadtown.com.pk";

const jsonLd = organizationSchema({
  name: "Etihad Town",
  description:
    "Lahore's premier master-planned community offering residential and commercial plots across multiple phases with flexible payment plans.",
  url: siteUrl,
  telephone: "+92-42-111-99-88-77",
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
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Etihad Town Lahore — Premium Living & Investment",
    template: "%s | Etihad Town Lahore",
  },
  description:
    "Etihad Town Lahore — master-planned community offering residential and commercial plots across multiple phases. Secure your investment with flexible payment plans.",
  keywords: [
    "Etihad Town Lahore",
    "Etihad Town plots",
    "Etihad Town payment plan",
    "Etihad Town Phase 4",
    "Lahore real estate",
    "plots in Lahore",
  ],
  openGraph: {
    title: "Etihad Town Lahore — Premium Living & Investment",
    description:
      "Master-planned community in Lahore. Residential and commercial plots available with flexible payment plans.",
    locale: "en_PK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
