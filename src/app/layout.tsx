
"use client"; // Add "use client" to use hooks

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import I18nAppProvider from '@/app/i18n/I18nProvider';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700']
});

// Metadata cannot be exported from a Client Component.
// If you need to set metadata, consider doing it in a Server Component parent
// or in specific page components if the metadata is page-specific.
// export const metadata: Metadata = {
//   title: 'CLARC 2025: Bridging Minds',
//   description: 'Conference website for CLARC 2025',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation(); // Get i18n instance

  return (
    <html lang={i18n.language} className="scroll-smooth h-full dark">
      <body 
        className={`${openSans.variable} font-sans antialiased flex flex-col min-h-screen h-full`}
      >
        <I18nAppProvider> {/* I18nProvider should wrap components that use translations */}
          <div className="wave-background-container" aria-hidden="true">
            <div className="wave-element wave-element-1"></div>
            <div className="wave-element wave-element-2"></div>
            <div className="wave-element wave-element-3"></div>
          </div>
          <div className="flex-grow relative z-0">
            {children}
          </div>
          <Toaster />
        </I18nAppProvider>
      </body>
    </html>
  );
}
