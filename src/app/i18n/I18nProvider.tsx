// src/app/i18n/I18nProvider.tsx
"use client";

import type { ReactNode } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import enTranslations from '@/locales/en/translation.json';
import hrTranslations from '@/locales/hr/translation.json';

// Create a new i18next instance
const i18n = i18next.createInstance();

// Initialize the instance only if it hasn't been already.
// This is to prevent re-initialization on hot reloads or multiple renders.
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next) // Essential for integrating i18next with React
    .init({
      resources: {
        en: { translation: enTranslations },
        hr: { translation: hrTranslations },
      },
      lng: 'en', // Default language
      fallbackLng: 'en', // Fallback language if a translation is missing
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },
      debug: process.env.NODE_ENV === 'development', // Enable logs in development
      react: {
        useSuspense: false, // Recommended for Next.js App Router
      },
    });
}

export default function I18nAppProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
