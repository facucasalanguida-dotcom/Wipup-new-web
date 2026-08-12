import type { Metadata } from "next";
import { Varela_Round, Nunito_Sans } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://wipup.com.ar";
const title = "WIPuP | Todo lo que tu mascota necesita";
const description =
  "Más de 15 años brindando productos de calidad para el bienestar de las mascotas en Argentina. Piedras sanitarias de silica gel, arena de bentonita, paños absorbentes y accesorios para mascotas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "WIPuP",
    "productos para mascotas",
    "piedras sanitarias",
    "silica gel para gatos",
    "arena de bentonita",
    "paños absorbentes para perros",
    "mascotas Argentina",
    "distribuidor productos mascotas",
  ],
  authors: [{ name: "WIPuP" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    title,
    description,
    siteName: "WIPuP",
    images: [{ url: "/images/hero-pets-cW53GTuj.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-pets-cW53GTuj.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${varelaRound.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
