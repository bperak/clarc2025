
"use client"; // Required for useTranslation hook

import Image from 'next/image';
import { BrainCircuit, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-8 w-8 text-primary mr-2" />
            <p className="text-xl font-semibold">{t('conferenceFullName')}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t('footer.inCollaborationWith')}</span>
            <a href="https://cji.uniri.hr/" target="_blank" rel="noopener noreferrer" aria-label="CJI - Center for Language Research">
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
        <p className="text-sm mb-4 text-muted-foreground">
          {t('footer.immersiveExperience')}
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          {t('footer.copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
