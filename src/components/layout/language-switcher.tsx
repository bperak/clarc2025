"use client";

import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (targetLang: string) => {
    i18n.changeLanguage(targetLang);
    // Optionally, you could still use router.push here if you want to update the URL path
    // For example, if you were using Next.js router:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // const pathname = window.location.pathname; // Or use router.pathname if available
    // let newPath = '';
    // const langPrefixRegex = /^\/(en|hr)/;
    // const currentPathWithoutLang = pathname.replace(langPrefixRegex, '');
    //
    // if (targetLang === 'en') { // Assuming 'en' is the default and doesn't need a prefix
    //   newPath = currentPathWithoutLang || '/';
    // } else {
    //   newPath = `/${targetLang}${currentPathWithoutLang || ''}`;
    // }
    // router.push(newPath);
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
          disabled={i18n.language === 'en'}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('hr')}
          disabled={i18n.language === 'hr'}
        >
          Hrvatski
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

