import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// Removed: import '@/i18n';
import I18nAppProvider from '@/app/i18n/I18nProvider'; // Import the new provider

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700']
});

export const metadata: Metadata = {
  title: 'CLARC 2025: Bridging Minds',
  description: 'Conference website for CLARC 2025',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full dark">
      <body 
        className={`${openSans.variable} font-sans antialiased flex flex-col min-h-screen h-full`}
      >
        <I18nAppProvider> {/* Wrap content with the I18n provider */}
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
