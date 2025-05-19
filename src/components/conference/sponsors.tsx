"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Sponsor = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
  dataAiHint: string;
  tier: 'Gold' | 'Silver';
};

const sponsorsData: Sponsor[] = [
  // Gold sponsors
  { 
    id: 'infobip', 
    name: 'InfoBip', 
    logoUrl: 'https://www.infobip.com/assets/svg/logo.svg', 
    description: 'Global cloud communications platform that enables businesses to build connected experiences.', 
    websiteUrl: 'https://www.infobip.com', 
    dataAiHint: 'communications logo', 
    tier: 'Gold' 
  },
  { 
    id: 'ericsson', 
    name: 'Ericsson Nikola Tesla', 
    logoUrl: 'https://www.ericsson.hr/documents/20123/0/header_logo.png/33b58a1c-da42-9a11-a59f-cd87e44f01b6?t=1555404379359', 
    description: 'Leading provider of information and communication technology solutions.', 
    websiteUrl: 'https://www.ericsson.hr', 
    dataAiHint: 'telecom logo', 
    tier: 'Gold' 
  },
  { 
    id: 'google', 
    name: 'Google', 
    logoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 
    description: 'Technology company specializing in internet-related services and AI innovation.', 
    websiteUrl: 'https://www.google.com', 
    dataAiHint: 'tech logo', 
    tier: 'Gold' 
  },
  
  // Silver sponsors
  { 
    id: 'klett', 
    name: 'Klett-Profil', 
    logoUrl: 'https://www.profil-klett.hr/sites/all/themes/klett/img/profil-klett-logo.png', 
    description: 'Educational publisher providing innovative learning materials and solutions.', 
    websiteUrl: 'https://www.profil-klett.hr/', 
    dataAiHint: 'education logo', 
    tier: 'Silver' 
  },
  { 
    id: 'ihj', 
    name: 'Institute for Croatian Language', 
    logoUrl: 'https://ihjj.hr/assets/img/logo.png', 
    description: 'Research institute dedicated to the study and preservation of Croatian language.', 
    websiteUrl: 'https://ihjj.hr/', 
    dataAiHint: 'institute logo', 
    tier: 'Silver' 
  },
  { 
    id: 'carnet', 
    name: 'BRAIN CARNET', 
    logoUrl: 'https://www.carnet.hr/wp-content/uploads/2023/11/brain-logo-color.png', 
    description: 'Croatian Academic and Research Network promoting digital transformation in education.', 
    websiteUrl: 'https://www.carnet.hr/projekt/brain/', 
    dataAiHint: 'network logo', 
    tier: 'Silver' 
  },
  { 
    id: 'croai', 
    name: 'CroAI', 
    logoUrl: 'https://croai.org/wp-content/uploads/2020/09/croai-logo-white.png', 
    description: 'Croatian AI Association promoting the development of artificial intelligence in Croatia.', 
    websiteUrl: 'https://www.croai.org', 
    dataAiHint: 'ai logo', 
    tier: 'Silver' 
  },
  { 
    id: 'porin', 
    name: 'Riječka razvojna agencija Porin', 
    logoUrl: 'https://www.porin.hr/wp-content/uploads/2021/06/logo.png', 
    description: 'Rijeka Development Agency supporting innovation and entrepreneurship.', 
    websiteUrl: 'https://www.porin.hr/', 
    dataAiHint: 'development logo', 
    tier: 'Silver' 
  },
  { 
    id: 'syntagent', 
    name: 'Syntagent', 
    logoUrl: 'https://syntagent.ai/logo.png', 
    description: 'AI-powered language technology company specializing in natural language processing solutions.', 
    websiteUrl: 'https://www.syntagent.ai', 
    dataAiHint: 'ai logo', 
    tier: 'Silver' 
  }
];

const tierStyles = {
  Gold: "border-yellow-500 dark:border-yellow-400 shadow-yellow-500/20 dark:shadow-yellow-400/20",
  Silver: "border-slate-400 dark:border-slate-500 shadow-slate-400/20 dark:shadow-slate-500/20",
}

const tierTextStyles = { 
  Gold: "text-yellow-300 dark:text-yellow-200 drop-shadow-sm",
  Silver: "text-slate-300 dark:text-slate-200 drop-shadow-sm",
}

export function SponsorHighlights() {
  const { t } = useTranslation();

  const groupedSponsors = sponsorsData.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const tierOrder: ('Gold' | 'Silver')[] = ['Gold', 'Silver'];

  const tierTitles = {
    Gold: t('sponsors.goldTierTitle'),
    Silver: t('sponsors.silverTierTitle'),
  };

  return (
    <section id="sponsors" className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-primary/10"> {/* Solid light blue themed base */}
        {/* Removed Image component that was here */}
        {/* Simplified gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/40 opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl">
          <Handshake className="mx-auto h-12 w-12 text-primary-foreground mb-4 drop-shadow-lg" />
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground drop-shadow-md">{t('sponsors.mainTitle')}</h2>
          <p className="text-primary-foreground/90 mt-2 drop-shadow-sm">
            {t('sponsors.mainDescription')}
          </p>
        </div>

        {tierOrder.map(tier => (
          groupedSponsors[tier] && (
            <div key={tier} className="mb-12 w-full max-w-6xl">
              <h3 className={`text-2xl font-semibold text-center mb-8 ${tierTextStyles[tier]}`}>{tierTitles[tier]}</h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center`}>
                {groupedSponsors[tier].map((sponsor) => (
                  <Card 
                    key={sponsor.id} 
                    className={`flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 ${tierStyles[sponsor.tier]} bg-card/90 dark:bg-card/80 backdrop-blur-sm`}
                  >
                    <CardHeader>
                      <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block p-2 bg-white/10 rounded-md">
                        <Image 
                          src={sponsor.logoUrl} 
                          alt={`${sponsor.name} logo`} 
                          width={180} 
                          height={90}
                          className="object-contain rounded-md"
                          data-ai-hint={sponsor.dataAiHint}
                        />
                      </a>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardTitle className="text-lg mb-1 text-card-foreground">{sponsor.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{sponsor.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
