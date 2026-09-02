"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function ThankYouTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // 1. Fire Google Analytics (GA4) generate_lead event
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "Leads",
        event_label: "Website Lead Form",
        value: 1,
        currency: "PKR",
      });

      // 2. Fire Google Ads conversion tag if environment variables are provided
      const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
      const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
      if (adsId && adsLabel) {
        window.gtag("event", "conversion", {
          send_to: `${adsId}/${adsLabel}`,
        });
      }
    }

    // 3. Push to GTM dataLayer for Google Tag Manager users
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_submitted",
        form_type: "website_lead",
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return null;
}
