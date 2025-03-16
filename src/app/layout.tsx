import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "./custom-styles.css";
import { Inter } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
