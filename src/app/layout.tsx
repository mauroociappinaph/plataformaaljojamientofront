import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthInitializer from "@/components/auth/AuthInitializer";
import { Navbar } from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma de Alojamiento",
  description: "Encuentra y reserva los mejores alojamientos para tus vacaciones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthInitializer />
        <Navbar />
        <main className="min-h-screen bg-background pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
