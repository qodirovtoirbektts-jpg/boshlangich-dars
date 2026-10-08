import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";
import CheckoutModal from "../components/CheckoutModal";
import OrderTrackingModal from "../components/OrderTrackingModal";
import B2BPortalModal from "../components/B2BPortalModal";
import AuthModal from "../components/AuthModal";
import SearchModal from "../components/SearchModal";
import PrinterWizard from "../components/PrinterWizard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://toxaprint.uz"),
  title: {
    default: "TOXA PRINT MARKET — O'zbekistonda Original Printerlar, Kartrijlar va Plotterlar Do'koni",
    template: "%s | TOXA PRINT MARKET",
  },
  description: "Toshkent va O'zbekistonning 14 viloyatiga HP, Epson, Canon printerlari, lazer va CISS kartrijlar, siyohlar hamda plotterlar yetkazib berish. Didox orqali elektron hisob-faktura (12% QQS), rasmiy kafolat va arzon narxlar.",
  keywords: [
    "printer sotib olish toshkent",
    "hp laserjet narxlari",
    "epson ecotank l3250 ciss",
    "canon megatank printer",
    "kartrij toshkent narxi",
    "plotter narxlari uzbekiston",
    "didox hisob faktura printer",
    "b2b orgtexnika toshkent",
    "printer toner kartrij",
    "toxa print market",
    "printer ta'mirlash toshkent",
    "купить принтер ташкент",
    "картриджи оптом ташкент",
    "оргтехника с ндс узбекистан",
  ],
  authors: [{ name: "TOXA PRINT MARKET", url: "https://toxaprint.uz" }],
  creator: "TOXA PRINT MARKET",
  publisher: "TOXA PRINT MARKET",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://toxaprint.uz",
  },
  openGraph: {
    title: "TOXA PRINT MARKET — O'zbekistonda Original Printerlar, Kartrijlar va Plotterlar",
    description: "Toshkent va 14 viloyatga printerlar, plotterlar va sarf materiallari distribyutsiyasi. Didox 12% QQS B2B xaridlar va rasmiy kafolat.",
    url: "https://toxaprint.uz",
    siteName: "TOXA PRINT MARKET",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOXA PRINT MARKET — Printerlar va Orgtexnika Portali",
    description: "Didox orqali elektron hisob-faktura, 12% QQS, 14 viloyatga tezkor yetkazib berish.",
  },
  other: {
    "geo.region": "UZ-TO",
    "geo.placename": "Tashkent",
    "geo.position": "41.2858;69.2038",
    "ICBM": "41.2858, 69.2038",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Google Rich Snippets
  const jsonLdStore = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "TOXA PRINT MARKET",
    alternateName: "Toxa Print Orgtexnika Do'koni",
    url: "https://toxaprint.uz",
    description: "O'zbekiston bo'ylab HP, Epson, Canon printerlari, kartrijlar va sarf materiallari rasmiy distribyutsiyasi.",
    telephone: "+998712000000",
    email: "info@toxaprint.uz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bunyodkor shox ko'chasi 42-uy",
      addressLocality: "Toshkent",
      addressRegion: "Toshkent shahri",
      postalCode: "100097",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.2858",
      longitude: "69.2038",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "UZS",
    paymentAccepted: "Cash, Credit Card, Payme, Click, Bank Transfer (Didox QQS)",
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TOXA PRINT MARKET",
    url: "https://toxaprint.uz",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://toxaprint.uz/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Toshkentda printerni rasmiy kafolati bilan qayerdan sotib olish mumkin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TOXA PRINT MARKET do'koni orqali HP, Epson, Canon printerlarini rasmiy 12 oydan 24 oygacha kafolat bilan xarid qilishingiz mumkin. Toshkent shahri va barcha 14 viloyatga yetkazib beriladi.",
        },
      },
      {
        "@type": "Question",
        name: "Yuridik shaxslar uchun Didox orqali 12% QQS bilan to'lov qilsa bo'ladimi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ha, TOXA PRINT MARKET Didox tizimi orqali to'lov hisob-varag'i (elektron schyot-faktura) taqdim etadi va barcha tovarlar 12% QQS bilan 1C tizimiga to'liq integratsiya qilinadi.",
        },
      },
      {
        "@type": "Question",
        name: "Viloyatlarga yetkazib berish xizmati bormi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Albatta. BTS va Express tezkor pochta orqali O'zbekistonning barcha 14 ta hududiga (Samarqand, Buxoro, Andijon, Farg'ona, Namangan, Qashqadaryo, Xorazm, Qoraqalpog'iston va boshqalar) 1-3 kun ichida yetkazib beriladi.",
        },
      },
    ],
  };

  return (
    <html lang="uz" className="scroll-smooth">
      <head>
        {/* Google Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#f8fafc] text-neutral-900 pb-20 md:pb-0`}>
        <CartProvider>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 md:px-8">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Interactive Modals and Drawers */}
          <Toast />
          <CartDrawer />
          <ProductModal />
          <CheckoutModal />
          <OrderTrackingModal />
          <B2BPortalModal />
          <AuthModal />
          <SearchModal />
          <PrinterWizard />
        </CartProvider>
      </body>
    </html>
  );
}
