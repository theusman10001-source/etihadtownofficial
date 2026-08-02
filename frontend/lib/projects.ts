export interface PaymentPlanRow {
  size: string
  block?: string
  status?: string
  price: number
  downPayment: number
  downPaymentLabel?: string
  installments: number
  monthly: number
  currency?: string
  balloons?: number
  balloonAmount?: number
  annualPayments?: number
  annualAmount?: number
  ballot?: number
  confirmation?: number
  possession?: number
}

export interface PaymentPlanGroup {
  title: string
  note?: string
  rows: PaymentPlanRow[]
}

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string[]
  status: "Available" | "Limited" | "Sold Out" | "Waiting List"
  gradient: string
  location: string
  features: string[]
  locationHighlights?: string[]
  paymentPlans?: PaymentPlanGroup[]
  faqs?: { question: string; answer: string }[]
}

export const projects: Project[] = [
  {
    slug: "phase-1",
    name: "Phase I",
    tagline: "The project that started it all — fully developed and delivered, home to 1,700+ happy families.",
    description: "Etihad Town Phase I is a fully developed residential community offering 5 Marla and 10 Marla plots. With complete infrastructure and a thriving community, Phase I remains one of the most sought-after phases.",
    longDescription: [
      "Etihad Town Phase – I laid the foundation of Etihad Real Estate's legacy. Today, it stands fully developed and successfully delivered, proudly serving as home to 1,700+ happy families.",
      "Built on the principles of trust, timely delivery, and uncompromising quality, Phase – I continues to set the benchmark for modern community living with its world-class infrastructure, premium amenities, and vibrant neighborhood.",
    ],
    status: "Limited",
    gradient: "from-primary to-primary-light",
    location: "Main Raiwind Road, Lahore",
    features: [
      "Grand Mosque",
      "Family Park",
      "The Palace (event venue)",
      "25+ renowned brands on board",
      "24/7 security",
    ],
    locationHighlights: [
      "02 minutes' drive from Canal Road",
      "05 minutes' drive from Thokar Niaz Baig",
      "05 minutes' drive from Wapda Town",
      "10 minutes' drive from Johar Town",
      "10 minutes' drive from DHA Rahbar",
      "15 minutes' drive from Emporium Mall",
      "15 minutes' drive from Lahore Ring Road",
      "35 minutes' drive from Allama Iqbal International Airport",
    ],
    paymentPlans: [
      {
        title: "Residential Plots",
        rows: [
          {
            size: "5 Marla", price: 12000000, downPayment: 2400000, downPaymentLabel: "20%",
            installments: 19, monthly: 225000, balloons: 3, balloonAmount: 960000, possession: 2445000,
          },
          {
            size: "10 Marla", price: 22000000, downPayment: 4400000, downPaymentLabel: "20%",
            installments: 19, monthly: 412000, balloons: 3, balloonAmount: 1760000, possession: 4492000,
          },
        ],
      },
      {
        title: "Overseas Block — Residential Plots",
        rows: [
          {
            size: "3 Marla", price: 7500000, downPayment: 1500000, downPaymentLabel: "20%",
            installments: 19, monthly: 140625, balloons: 3, balloonAmount: 600000, possession: 1528125,
          },
          {
            size: "5 Marla", price: 12000000, downPayment: 2400000, downPaymentLabel: "20%",
            installments: 19, monthly: 225000, balloons: 3, balloonAmount: 960000, possession: 2445000,
          },
          {
            size: "10 Marla", price: 22000000, downPayment: 4400000, downPaymentLabel: "20%",
            installments: 19, monthly: 412000, balloons: 3, balloonAmount: 1760000, possession: 4492000,
          },
        ],
      },
    ],
  },
  {
    slug: "phase-2",
    name: "Phase II",
    tagline: "95%+ developed with possession delivered across Blocks A–D and the Overseas Block.",
    description: "Etihad Town Phase II offers on-ground and residential plots with complete infrastructure. Possession has been delivered for Blocks A, B, C, D and the Overseas Block — now over 95% developed.",
    longDescription: [
      "Etihad Town Phase – II reflects our continued commitment to delivering exceptional communities with quality, precision, and trust. Possession has been successfully delivered for Blocks A, B, C, D, and the Overseas Block, while the project is now over 95% developed.",
      "With modern infrastructure, premium amenities, beautifully planned surroundings, and a fully livable environment, Phase – II stands as a testament to Etihad Real Estate's commitment to quality, timely delivery, and lasting value.",
    ],
    status: "Available",
    gradient: "from-neutral-600 to-neutral-700",
    location: "Ferozepur Road, Lahore",
    features: [
      "Sports Arena",
      "Grand Mosque",
      "24/7 security",
      "Gated community",
      "Stadium",
    ],
    locationHighlights: [
      "02 minutes' drive from Ferozepur Road",
      "05 minutes' drive from Lahore Ring Road",
      "08 minutes' drive from Central Park Housing Scheme",
      "10 minutes' drive from Lahore Motorway Interchange",
      "15 minutes' drive from DHA Lahore",
      "20 minutes' drive from Allama Iqbal International Airport",
      "25 minutes' drive from Kalma Chowk",
    ],
    paymentPlans: [
      {
        title: "On Ground Residential Plots",
        rows: [
          {
            size: "5 Marla", price: 6925000, downPayment: 1385000, downPaymentLabel: "20%",
            installments: 24, monthly: 103220, balloons: 3, balloonAmount: 484750, possession: 1402024,
          },
          {
            size: "7 Marla", price: 9405000, downPayment: 1881000, downPaymentLabel: "20%",
            installments: 24, monthly: 140186, balloons: 3, balloonAmount: 658350, possession: 1904120,
          },
          {
            size: "10 Marla", price: 12550000, downPayment: 2510000, downPaymentLabel: "20%",
            installments: 24, monthly: 187063, balloons: 3, balloonAmount: 878500, possession: 2540852,
          },
          {
            size: "20 Marla", price: 24000000, downPayment: 4800000, downPaymentLabel: "20%",
            installments: 24, monthly: 357731, balloons: 3, balloonAmount: 1680000, possession: 4858999,
          },
          {
            size: "40 Marla", price: 47100000, downPayment: 9420000, downPaymentLabel: "20%",
            installments: 24, monthly: 702047, balloons: 3, balloonAmount: 3297000, possession: 9535785,
          },
        ],
      },
      {
        title: "Residential Plots",
        rows: [
          {
            size: "5 Marla", price: 5350000, downPayment: 1070000, downPaymentLabel: "20%",
            installments: 32, monthly: 64803, balloons: 3, balloonAmount: 374500, possession: 1082810,
          },
          {
            size: "7 Marla", price: 7200000, downPayment: 1440000, downPaymentLabel: "20%",
            installments: 32, monthly: 87211, balloons: 3, balloonAmount: 504000, possession: 1457239,
          },
          {
            size: "10 Marla", price: 9400000, downPayment: 1880000, downPaymentLabel: "20%",
            installments: 32, monthly: 113859, balloons: 3, balloonAmount: 658000, possession: 1902507,
          },
          {
            size: "20 Marla", price: 17700000, downPayment: 3540000, downPaymentLabel: "20%",
            installments: 32, monthly: 214394, balloons: 3, balloonAmount: 1239000, possession: 3582380,
          },
          {
            size: "40 Marla", price: 34500000, downPayment: 6900000, downPaymentLabel: "20%",
            installments: 32, monthly: 417887, balloons: 3, balloonAmount: 2415000, possession: 6982606,
          },
        ],
      },
      {
        title: "Commercial Plots",
        rows: [
          {
            size: "2.66 Marla", price: 11899000, downPayment: 2379800, downPaymentLabel: "20%",
            installments: 24, monthly: 228827, annualPayments: 2, annualAmount: 594950, possession: 2379800,
          },
          {
            size: "4 Marla", price: 16000000, downPayment: 3200000, downPaymentLabel: "20%",
            installments: 24, monthly: 307692, annualPayments: 2, annualAmount: 800000, possession: 3200000,
          },
          {
            size: "5.33 Marla", price: 22000000, downPayment: 4400000, downPaymentLabel: "20%",
            installments: 24, monthly: 423077, annualPayments: 2, annualAmount: 1100000, possession: 4400000,
          },
          {
            size: "5.33 Marla", block: "Facing Park", price: 26000000, downPayment: 5200000, downPaymentLabel: "20%",
            installments: 24, monthly: 500000, annualPayments: 2, annualAmount: 1300000, possession: 5200000,
          },
          {
            size: "8 Marla", block: "Facing Park", price: 40000000, downPayment: 8000000, downPaymentLabel: "20%",
            installments: 24, monthly: 769231, annualPayments: 2, annualAmount: 2000000, possession: 8000000,
          },
        ],
      },
    ],
  },
  {
    slug: "phase-3",
    name: "Phase III",
    tagline: "An iconic, master-planned community with prime commercial avenues and boulevards.",
    description: "Etihad Town Phase III offers residential and commercial plots — including Jinnah Avenue, Pine Avenue, Business Park, and 300 ft. wide Jhelum Road frontage.",
    longDescription: [
      "Following the remarkable success of its developments across Lahore, Rahim Yar Khan, and Sialkot, Etihad Town introduced Phase – III as one of its most iconic and ambitious projects.",
      "Strategically located and master-planned, the development combines exceptional accessibility, modern infrastructure, premium amenities, and contemporary urban planning to create a destination that sets new standards for community living.",
    ],
    status: "Available",
    gradient: "from-primary-light to-primary",
    location: "Adda Plot, Lahore Ring Road, Lahore",
    features: [
      "Shopping Mall",
      "Sports Arena",
      "Restaurants",
      "Grand Mosque",
      "24/7 security",
      "Gated community",
    ],
    locationHighlights: [
      "02 minutes' drive from Lahore Ring Road (Adda Plot Interchange)",
      "03 minutes' drive from Pine Avenue",
      "05 minutes' drive from Raiwind Road",
      "10 minutes' drive from Canal Road",
      "15 minutes' drive from Thokar Niaz Baig",
      "20 minutes' drive from DHA Lahore",
      "30 minutes' drive from Allama Iqbal International Airport",
    ],
    paymentPlans: [
      {
        title: "Residential Plots",
        rows: [
          {
            size: "5 Marla", price: 5700000, downPayment: 1140000,
            installments: 30, monthly: 57000, balloons: 4, balloonAmount: 285000, ballot: 570000, possession: 1140000,
          },
          {
            size: "10 Marla", price: 10200000, downPayment: 2040000,
            installments: 30, monthly: 102000, balloons: 4, balloonAmount: 510000, ballot: 1020000, possession: 2040000,
          },
          {
            size: "20 Marla", price: 19000000, downPayment: 3800000,
            installments: 30, monthly: 190000, balloons: 4, balloonAmount: 950000, ballot: 1900000, possession: 3800000,
          },
          {
            size: "40 Marla", price: 36700000, downPayment: 7340000,
            installments: 30, monthly: 367000, balloons: 4, balloonAmount: 1835000, ballot: 3670000, possession: 7340000,
          },
        ],
      },
      {
        title: "Commercial Plots",
        rows: [
          {
            size: "8 Marla", block: "Water Park", price: 44000000, downPayment: 8800000,
            installments: 32, monthly: 550000, annualPayments: 2, annualAmount: 4400000, possession: 8800000,
          },
          {
            size: "5.33 Marla", block: "Jinnah Avenue", price: 29000000, downPayment: 6200000,
            installments: 32, monthly: 350000, annualPayments: 2, annualAmount: 2900000, possession: 5800000,
          },
          {
            size: "5.33 Marla", block: "Pine Vertical Avenue", price: 29000000, downPayment: 6200000,
            installments: 32, monthly: 350000, annualPayments: 2, annualAmount: 2900000, possession: 5800000,
          },
          {
            size: "5.33 Marla", block: "Business Park", price: 29000000, downPayment: 6200000,
            installments: 32, monthly: 350000, annualPayments: 2, annualAmount: 2900000, possession: 5800000,
          },
          {
            size: "4 Marla", block: "Water Park", price: 22000000, downPayment: 4900000,
            installments: 32, monthly: 260000, annualPayments: 2, annualAmount: 2200000, possession: 4380000,
          },
          {
            size: "2.66 Marla", block: "Sector Shop", price: 11172000, downPayment: 4223400,
            installments: 32, monthly: 139000, annualPayments: 2, annualAmount: 1117200, possession: 2255200,
          },
        ],
      },
      {
        title: "Commercial Plots — 300 Ft. Wide Jhelum Road",
        rows: [
          {
            size: "1 Kanal", block: "Jhelum Road", price: 130000000, downPayment: 26000000,
            installments: 32, monthly: 1625000, annualPayments: 2, annualAmount: 13000000, possession: 26000000,
          },
          {
            size: "13.33 Marla", block: "Jhelum Road (Back Side)", price: 70000000, downPayment: 14000000,
            installments: 32, monthly: 875000, annualPayments: 2, annualAmount: 7000000, possession: 14000000,
          },
        ],
      },
      {
        title: "Commercial Plots — 150 Ft. Wide Pine Avenue",
        rows: [
          {
            size: "8 Marla", block: "Pine Avenue", price: 68000000, downPayment: 14400000,
            installments: 32, monthly: 825000, annualPayments: 2, annualAmount: 6800000, possession: 13600000,
          },
          {
            size: "5.33 Marla", block: "Pine Avenue (Back Side)", price: 29000000, downPayment: 6200000,
            installments: 32, monthly: 350000, annualPayments: 2, annualAmount: 2900000, possession: 5800000,
          },
        ],
      },
    ],
  },
  {
    slug: "phase-4",
    name: "Phase IV",
    tagline: "The latest milestone, in collaboration with Shahana Living — connected to Chenab & Jhelum Road.",
    description: "Etihad Town Phase IV is the newest phase, master-planned with modern infrastructure, premium amenities, and thoughtfully designed residential spaces. Pre-launch payment plans now available.",
    longDescription: [
      "Etihad Town Phase – IV, in collaboration with Shahana Living, is the latest milestone in Etihad Real Estate's journey of excellence. Inspired by the success of 8 landmark developments across Lahore, Sialkot, and Rahim Yar Khan, Phase – IV has been master-planned to deliver an exceptional lifestyle with modern infrastructure, premium amenities, and thoughtfully designed residential and commercial spaces.",
      "Strategically located with seamless connectivity to Chenab Road and Jhelum Road, Phase – IV offers unmatched accessibility, premium infrastructure, and exceptional long-term investment potential.",
    ],
    status: "Available",
    gradient: "from-emerald-800 to-primary",
    location: "Chenab Road / Jhelum Road, Lahore",
    features: [
      "Wide carpeted roads",
      "Gated community",
      "Underground electricity",
      "Family Park",
      "Commercial district",
      "Connected with Chenab Road",
    ],
    locationHighlights: [
      "02 minutes' drive from Lahore Ring Road",
      "03 minutes' drive from Adda Plot Interchange",
      "05 minutes' drive from Raiwind Road",
      "05 minutes' drive from Pine Avenue",
      "10 minutes' drive from DHA Rahbar",
      "15 minutes' drive from Thokar Niaz Baig",
      "20 minutes' drive from Canal Road",
      "30 minutes' drive from Allama Iqbal International Airport",
    ],
    paymentPlans: [
      {
        title: "Residential Plots (3-Year Plan)",
        rows: [
          {
            size: "5 Marla", price: 6200000, downPayment: 1240000, downPaymentLabel: "20%",
            installments: 30, monthly: 62000, balloons: 4, balloonAmount: 310000, ballot: 620000, possession: 1240000,
          },
          {
            size: "10 Marla", price: 11000000, downPayment: 2200000, downPaymentLabel: "20%",
            installments: 30, monthly: 110000, balloons: 4, balloonAmount: 550000, ballot: 1100000, possession: 2200000,
          },
          {
            size: "20 Marla", price: 20500000, downPayment: 4100000, downPaymentLabel: "20%",
            installments: 30, monthly: 205000, balloons: 4, balloonAmount: 1025000, ballot: 2050000, possession: 4100000,
          },
          {
            size: "40 Marla", price: 39000000, downPayment: 7800000, downPaymentLabel: "20%",
            installments: 30, monthly: 390000, balloons: 4, balloonAmount: 1950000, ballot: 3900000, possession: 7800000,
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is an overseas block available in Phase IV?",
        answer: "Phase IV has a dedicated overseas offering. Contact our sales team for the latest overseas payment plans and availability.",
      },
      {
        question: "What is the total price of a 5 Marla plot in Phase IV?",
        answer: "A 5 Marla plot in Phase IV is Rs. 62.00 Lacs, with a 20% down payment, ballot payment, 4 balloon payments, and 30 monthly installments.",
      },
    ],
  },
  {
    slug: "premier-enclave",
    name: "Premier Enclave",
    tagline: "Fully delivered enclave with 1,600 ft. frontage on Main Raiwind Road and the only planned commercial space.",
    description: "Etihad Town Premier Enclave is a fully developed and completely delivered residential community with a 1,600 ft. frontage on Main Raiwind Road. 5 Marla and 10 Marla residential options remain, with flexible 1–2 year payment plans.",
    longDescription: [
      "Etihad Town Premier Enclave is a fully developed and completely delivered residential community, strategically located on Main Raiwind Road, Lahore. It features a striking 1,600 ft. frontage and the only planned commercial space on the road, adhering to international standards.",
      "With excellent connectivity, quality infrastructure, landscaped surroundings, and a well-integrated commercial area, Premier Enclave offers residents a mix of convenience and luxury, while businesses benefit from a prime, high-traffic location.",
    ],
    status: "Limited",
    gradient: "from-blue-800 to-primary",
    location: "Main Raiwind Road, Lahore",
    features: [
      "Family Park",
      "Planned commercial zone",
      "1,600 ft. frontage on Main Raiwind Road",
      "Quality infrastructure",
      "24/7 security",
    ],
    locationHighlights: [
      "02 minutes' drive from M2 Motorway",
      "02 minutes' drive from Canal Road",
      "05 minutes' drive from Thokar Niaz Baig",
      "05 minutes' drive from Shaukat Khanum Memorial Cancer Hospital",
      "15 minutes' drive from Lahore Ring Road",
      "25 minutes' drive from DHA Lahore",
      "35 minutes' drive from Allama Iqbal International Airport",
    ],
    paymentPlans: [
      {
        title: "Residential Plots",
        rows: [
          {
            size: "5 Marla", block: "1-Year Plan", price: 13000000, downPayment: 1300000, downPaymentLabel: "10%",
            installments: 11, monthly: 455000, confirmation: 1950000, balloons: 2, balloonAmount: 1397500, possession: 1950000,
          },
          {
            size: "5 Marla", block: "2-Years Plan", price: 13000000, downPayment: 1300000, downPaymentLabel: "10%",
            installments: 20, monthly: 195000, confirmation: 1950000, balloons: 3, balloonAmount: 1300000, possession: 1950000,
          },
          {
            size: "10 Marla", block: "Limited Inventory", status: "Limited", price: 24500000, downPayment: 3675000, downPaymentLabel: "15%",
            installments: 20, monthly: 306250, confirmation: 3675000, balloons: 3, balloonAmount: 2450000, possession: 3675000,
          },
          {
            size: "20 Marla", block: "2-Years Plan", status: "Sold Out", price: 43000000, downPayment: 6450000, downPaymentLabel: "15%",
            installments: 20, monthly: 537500, confirmation: 6450000, balloons: 3, balloonAmount: 4300000, possession: 6450000,
          },
        ],
      },
      {
        title: "Commercial Plots",
        rows: [
          {
            size: "2.6 Marla", status: "Sold Out", price: 18200000, downPayment: 2730000, downPaymentLabel: "15%",
            installments: 20, monthly: 227500, confirmation: 2730000, balloons: 3, balloonAmount: 1820000, possession: 2730000,
          },
          {
            size: "4 Marla", status: "Sold Out", price: 28500000, downPayment: 4275000, downPaymentLabel: "15%",
            installments: 20, monthly: 356250, confirmation: 4275000, balloons: 3, balloonAmount: 2850000, possession: 4275000,
          },
          {
            size: "5.33 Marla", status: "Sold Out", price: 53800000, downPayment: 8070000, downPaymentLabel: "15%",
            installments: 20, monthly: 672500, confirmation: 8070000, balloons: 3, balloonAmount: 5380000, possession: 8070000,
          },
          {
            size: "8 Marla", status: "Sold Out", price: 84500000, downPayment: 12675000, downPaymentLabel: "15%",
            installments: 20, monthly: 1056250, confirmation: 12675000, balloons: 3, balloonAmount: 8450000, possession: 12675000,
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Premier Enclave still available?",
        answer: "Residential 5 Marla plots are available on 1-year and 2-years plans, and 10 Marla has limited inventory. 20 Marla and all commercial plots are sold out.",
      },
      {
        question: "What is the price of a 5 Marla plot in Premier Enclave?",
        answer: "A 5 Marla plot is Rs. 1.30 Crore. On the 2-years plan it requires a 10% booking, 15% confirmation, 20 installments, 3 balloon payments, and 15% on possession.",
      },
    ],
  },
  {
    slug: "sialkot",
    name: "Sialkot",
    tagline: "Sialkot's first planned housing society — 800 ft. frontage on Main Sialkot–Daska Road.",
    description: "Etihad Town Sialkot is Sialkot's first planned housing society, featuring a 120 ft. Main Boulevard, Faiz Avenue, Iqbal Avenue, and a vibrant Grand Park within the Business District.",
    longDescription: [
      "Etihad Town Sialkot is Sialkot's first planned housing society, strategically located with an impressive 800 ft. frontage on Main Sialkot–Daska Road.",
      "Featuring a 120 ft. Main Boulevard, Faiz Avenue, Iqbal Avenue, and a vibrant Grand Park within the Business District, the project offers an ideal blend of residential comfort and commercial opportunity, with 15+ renowned brands on board and development progressing across Blocks A, B, C, and the Executive Block.",
    ],
    status: "Available",
    gradient: "from-amber-800 to-primary",
    location: "Main Sialkot–Daska Road, Sialkot",
    features: [
      "Family Park",
      "24/7 security",
      "Dedicated commercial zone",
      "Grand Mosque",
      "Gated community",
    ],
    locationHighlights: [
      "02 minutes' drive from Daska Road",
      "03 minutes' drive from Lahore–Sialkot Motorway",
      "15 minutes' drive from Sialkot International Airport",
      "15 minutes' drive from Sialkot City Centre",
      "20 minutes' drive from Sialkot Dry Port",
      "25 minutes' drive from Gujranwala Road",
    ],
    paymentPlans: [
      {
        title: "Residential Plots",
        rows: [
          {
            size: "5 Marla", price: 4750000, downPayment: 712500, downPaymentLabel: "15%",
            installments: 36, monthly: 52500, confirmation: 475000, ballot: 712500, possession: 960000,
          },
          {
            size: "10 Marla", price: 9300000, downPayment: 1395000, downPaymentLabel: "15%",
            installments: 36, monthly: 103500, confirmation: 930000, ballot: 1395000, possession: 1854000,
          },
          {
            size: "20 Marla", price: 18200000, downPayment: 2730000, downPaymentLabel: "15%",
            installments: 36, monthly: 202000, confirmation: 1820000, ballot: 2730000, possession: 3648000,
          },
        ],
      },
      {
        title: "Commercial Plots",
        rows: [
          {
            size: "4 Marla", price: 18400000, downPayment: 2760000, downPaymentLabel: "15%",
            installments: 36, monthly: 204000, confirmation: 1840000, ballot: 2776000, possession: 3680000,
          },
          {
            size: "5.33 Marla", price: 29315000, downPayment: 4397250, downPaymentLabel: "15%",
            installments: 36, monthly: 325000, confirmation: 2931500, ballot: 4423250, possession: 5863000,
          },
          {
            size: "8 Marla", price: 48000000, downPayment: 7200000, downPaymentLabel: "15%",
            installments: 36, monthly: 532000, confirmation: 4800000, ballot: 7248000, possession: 9600000,
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Where is Etihad Town Sialkot located?",
        answer: "Etihad Town Sialkot is located on Main Sialkot–Daska Road, with an 800 ft. frontage and 02 minutes' drive from the Lahore–Sialkot Motorway.",
      },
      {
        question: "What are the payment terms in Sialkot?",
        answer: "Residential plots require a 15% booking, 10% confirmation, 36 monthly installments, a 15% ballot amount, and 20% on possession.",
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getStartingPrice(project: Project): number {
  let min = 0
  for (const group of project.paymentPlans ?? []) {
    for (const row of group.rows) {
      if (min === 0 || row.price < min) min = row.price
    }
  }
  return min
}

export function formatPrice(amount: number, currency = "PKR"): string {
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US")}`
  }
  return `Rs. ${amount.toLocaleString("en-PK")}`
}

export function formatPriceCr(amount: number, currency = "PKR"): string {
  if (currency === "USD") return formatPrice(amount, currency)
  if (amount >= 10000000) {
    return `Rs. ${(amount / 10000000).toFixed(2)} Crore`
  }
  if (amount >= 100000) {
    return `Rs. ${(amount / 100000).toFixed(2)} Lac`
  }
  return formatPrice(amount, currency)
}
