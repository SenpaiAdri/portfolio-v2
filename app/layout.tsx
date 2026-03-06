import type { Metadata } from "next";
import { Bruno_Ace_SC } from "next/font/google";
import "./globals.css";

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
  description: "Personal website of Adrian",
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
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Eydriannn",
    description: "Personal website of Adrian",
    url: "https://eydriannn.vercel.app",
    siteName: "Eydriannn",
    images: [
      {
        url: "/logo.svg",
        width: 600,
        height: 600,
        alt: "Eydriannn Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eydriannn",
    description: "Personal website of Adrian",
    images: ["/logo.svg"],
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
