
"use client"; // Required for useTranslation hook

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BrainCircuit } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();

  const navItems = [
    { href: '#hero', labelKey: 'nav.home' },
    { href: '#schedule', labelKey: 'nav.schedule' },
    { href: '#speakers', labelKey: 'nav.speakers' },
    { href: '#ai-assistant', labelKey: 'nav.aiAssistant' },
    { href: '#registration', labelKey: 'nav.register' },
    { href: '#sponsors', labelKey: 'nav.sponsors' },
    { href: '#venue', labelKey: 'nav.venue' },
    { href: '#accommodations', labelKey: 'nav.accommodations' },
    { href: '#about-opatija', labelKey: 'nav.aboutOpatija' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="#hero" className="mr-6 pl-5 flex items-center space-x-2"> {/* Increased pl-2 to pl-5 */}
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            CLARC 2025
          </span>
        </Link>
        <nav className="hidden lg:flex flex-1 items-center space-x-4 xl:space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher />
          <Button asChild className="hidden md:inline-flex">
            <Link href="#registration">{t('nav.registerNowButton')}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
               <SheetPrimitive.Title className="sr-only">Navigation Menu</SheetPrimitive.Title>
               <SheetPrimitive.Description className="sr-only">
                 A list of navigation links to explore the site.
               </SheetPrimitive.Description>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  // For Sheet, ideally, you'd use SheetClose asChild on Link for automatic closing.
                  // However, simple navigation might be sufficient for typical use cases.
                  // If Sheet needs to close on nav, further adjustments might be needed.
                  <SheetPrimitive.Close asChild key={item.labelKey}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </SheetPrimitive.Close>
                ))}
                <SheetPrimitive.Close asChild>
                  <Button asChild className="mt-4">
                    <Link href="#registration">{t('nav.registerNowButton')}</Link>
                  </Button>
                </SheetPrimitive.Close>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
