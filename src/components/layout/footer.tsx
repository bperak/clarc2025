
"use client"; // Required for useTranslation hook

import Image from 'next/image';
import { BrainCircuit, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-primary-foreground py-12 md:py-16 mt-auto overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x800.png?text=%20" 
          alt="Abstract futuristic background for footer"
          layout="fill"
          objectFit="cover"
          className="opacity-15" 
          data-ai-hint="dark abstract"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-background/40 to-accent/50 opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-8 w-8 text-primary-foreground mr-2 drop-shadow-md" />
            <p className="text-xl font-semibold text-primary-foreground drop-shadow-sm">{t('conferenceFullName')}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-foreground/80 drop-shadow-sm">{t('footer.inCollaborationWith')}</span>
            <a href="https://cji.uniri.hr/" target="_blank" rel="noopener noreferrer" aria-label="CJI - Center for Language Research" className="bg-white/10 p-1 rounded-md hover:bg-white/20 transition-colors">
              <Image 
                src="https://cji.uniri.hr/wp-content/uploads/cji_logo-removebg-preview-1-e1695380857613-150x150.png" 
                alt="CJI Logo" 
                width={150}
                height={150}
                className="h-10 w-auto object-contain" 
                data-ai-hint="CJI logo" 
              />
            </a>
          </div>
        </div>
        <p className="text-sm mb-4 text-primary-foreground/90 drop-shadow-sm">
          {t('footer.immersiveExperience')}
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="CLARC Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="CLARC Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="CLARC LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-xs text-primary-foreground/70 drop-shadow-sm">
          {t('footer.copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
