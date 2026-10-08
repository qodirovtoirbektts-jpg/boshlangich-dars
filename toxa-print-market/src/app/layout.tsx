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
  title: "Toxa Print Market - Orgtexnika va Bosma Uskunalari Portali",
  description: "O'zbekistonning 14 hududiga printerlar, plotterlar va original sarf materiallari distribyutsiyasi. B2C va B2B QQSli xaridlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth">
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
