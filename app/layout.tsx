import type { Metadata, Viewport } from "next";
import { Bruno_Ace_SC } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const brunoAceSC = Bruno_Ace_SC({
  variable: "--font-bruno-ace-sc",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eydriannn.vercel.app"),
  title: {
    default: "Eydriannn",
    template: "%s | Eydriannn",
  },
  description:
    "Portfolio of Adrian M. De Guzman — full-stack developer and Computer Science student crafting detail-oriented web and mobile experiences.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Adrian",
    "Eydriannn",
  ],
  authors: [{ name: "Adrian" }],
  creator: "Adrian",
  icons: {
    icon: "/my_logo.svg",
    apple: "/my_logo.png",
  },
  openGraph: {
    title: "Eydriannn",
    description:
      "Portfolio of Adrian M. De Guzman — full-stack developer and Computer Science student crafting detail-oriented web and mobile experiences.",
    url: "https://eydriannn.vercel.app",
    siteName: "Eydriannn",
    images: [
      {
        url: "/my_logo.png",
        width: 512,
        height: 512,
        alt: "Eydriannn Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eydriannn",
    description:
      "Portfolio of Adrian M. De Guzman — full-stack developer and Computer Science student crafting detail-oriented web and mobile experiences.",
    images: ["/my_logo.png"],
  },
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
