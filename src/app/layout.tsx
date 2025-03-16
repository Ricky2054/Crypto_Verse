import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "./custom-styles.css";
import MainNavbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CryptoVerse - Your Gateway to the Future of Finance",
  description: "Track cryptocurrencies, manage your portfolio, and stay updated with the latest crypto news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-light`}>
        <MainNavbar />
        <main>
          {children}
        </main>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
