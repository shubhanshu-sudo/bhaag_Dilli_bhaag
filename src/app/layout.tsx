import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/Toast";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhaag Dilli Bhaag - North Delhi's Biggest Running Event",
  description: "Join Bhaag Dilli Bhaag 2026 on 1st March at Sector-10, Rohini. Every step helps build classrooms for underprivileged children. Register now for 2KM, 5KM, or 10KM races.",
  keywords: ["Bhaag Dilli Bhaag", "Delhi Marathon", "Running Event", "Rohini Marathon", "Charity Run", "Delhi Running Event 2026"],
  authors: [{ name: "Bhaag Dilli Bhaag" }],
  creator: "Bhaag Dilli Bhaag",
  publisher: "Bhaag Dilli Bhaag",
  metadataBase: new URL('https://www.bhaagdillibhaag.in'),

  // Favicon Configuration - Updated with logo.png
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },

  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.bhaagdillibhaag.in",
    title: "Bhaag Dilli Bhaag - North Delhi's Biggest Running Event",
    description: "Join us on 1st March 2026 at Sector-10, Rohini. Every step helps build classrooms for underprivileged children.",
    siteName: "Bhaag Dilli Bhaag",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Bhaag Dilli Bhaag Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Bhaag Dilli Bhaag - North Delhi's Biggest Running Event",
    description: "Join us on 1st March 2026. Every step helps build classrooms for underprivileged children.",
    images: ["/logo.png"],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon links for better browser compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <MetaPixel />
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
