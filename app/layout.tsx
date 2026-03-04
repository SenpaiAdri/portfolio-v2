import type { Metadata } from "next";
import { Bruno_Ace_SC } from "next/font/google";
import "./globals.css";

const brunoAceSC = Bruno_Ace_SC({
  variable: "--font-bruno-ace-sc",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eydriannn",
  description: "v2 portfolio of Eydrannn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${brunoAceSC.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
