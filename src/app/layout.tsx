import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "./custom-styles.css";
import { Inter } from 'next/font/google';
import Script from 'next/script';

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
      <head>
        {/* Force reload CSS files */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      </head>
      <body className={`${inter.className} bg-dark text-light`}>
        {children}
        
        {/* Add debugging script */}
        <Script id="debug-script" strategy="afterInteractive">
          {`
            console.log('Layout script loaded');
            document.addEventListener('DOMContentLoaded', function() {
              console.log('DOM fully loaded');
              console.log('Body classes:', document.body.className);
            });
          `}
        </Script>
      </body>
    </html>
  );
}
