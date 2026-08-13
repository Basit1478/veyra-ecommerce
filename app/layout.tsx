import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/cart-context";
import { CartDrawer } from "./components/cart-drawer";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = { title: { default: "VEYRA ATELIER", template: "%s — VEYRA" }, description: "Quiet forms, made by hand. Discover the first edition from Veyra Atelier." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body><CartProvider><Header />{children}<Footer /><CartDrawer /></CartProvider></body></html>;
}

