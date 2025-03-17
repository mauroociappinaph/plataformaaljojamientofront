import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
