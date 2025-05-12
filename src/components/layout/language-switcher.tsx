"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const segments = pathname.split('/');
    // segments[0] is "" (empty string before the first slash)
    // For path "/", segments will be ["", ""]
    // For path "/about", segments will be ["", "about"]
    // For path "/en/about", segments will be ["", "en", "about"]

    if (segments[1] === 'hr') {
      setCurrentLang('hr');
    } else if (segments[1] === 'en') {
      setCurrentLang('en');
    } else {
      // Default to 'en' for paths like "/" or "/about" (no language prefix)
      // as per middleware configuration making 'en' the default.
      setCurrentLang('en');
    }
  }, [pathname]);

  const changeLanguage = (targetLang: string) => {
    // Avoid navigation if already on the target language and path reflects it
    // (e.g. currentLang is 'en' and pathname starts with /en, or currentLang is 'en' and pathname is / or /about)
    if (currentLang === targetLang) {
        if (targetLang === 'en' && (pathname.startsWith('/en') || !pathname.startsWith('/hr'))) {
            return;
        }
        if (targetLang === 'hr' && pathname.startsWith('/hr')) {
            return;
        }
    }

    const segments = pathname.split('/');
    let newPath;

    if (segments[1] === 'en' || segments[1] === 'hr') {
      // Current path has a language prefix like /en/... or /hr/...
      // Replace the existing language prefix with the target language
      segments[1] = targetLang;
      newPath = segments.join('/');
      // If the original path was just "/en" or "/hr" (segments like ["", "en"]),
      // segments.join('/') correctly becomes "/<targetLang>" (e.g., "/hr").
    } else {
      // Current path does not have a language prefix (e.g., "/" or "/about")
      // This implies it's default 'en' content. Prepend the target language.
      if (pathname === '/') {
        newPath = `/${targetLang}`;
      } else {
        // pathname is like "/about", so prepend "/<targetLang>"
        newPath = `/${targetLang}${pathname}`;
      }
    }
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change language">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          disabled={currentLang === 'en' && (pathname.startsWith('/en/') || pathname === '/en' || (!pathname.startsWith('/hr/') && pathname !== '/hr'))}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('hr')}
          disabled={currentLang === 'hr' && (pathname.startsWith('/hr/') || pathname === '/hr')}
        >
          Hrvatski
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
