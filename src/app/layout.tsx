import type {Metadata} from 'next';
import { Open_Sans } from 'next/font/google'; // Changed from Geist to Open Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({ // Initialize Open Sans
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'] // Specify weights if needed
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
        <div className="wave-background-container" aria-hidden="true">
          <div className="wave-element wave-element-1"></div>
          <div className="wave-element wave-element-2"></div>
          <div className="wave-element wave-element-3"></div>
        </div>
        <div className="flex-grow relative z-0"> {/* Ensure content is above waves */}
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
