import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Casa119", description: "Conheça a Casa 119, um espaço de cultura, gastronomia, arte, música e encontros na Vila Arens, em Jundiaí.", icons: { icon: "/logo-casa119.svg" }, robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
