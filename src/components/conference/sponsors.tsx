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
  tier: 'Platinum' | 'Gold' | 'Silver';
};

const sponsorsData: Sponsor[] = [
  { id: 'sponsor1', name: 'Innovatech Solutions', logoUrl: 'https://picsum.photos/seed/innovatech/200/100', description: 'Leading the charge in AI-driven technological innovation and enterprise solutions.', websiteUrl: '#', dataAiHint: 'tech logo', tier: 'Platinum' },
  { id: 'sponsor2', name: 'FutureAI Corp', logoUrl: 'https://picsum.photos/seed/futureai/200/100', description: 'Building tomorrow\'s intelligent systems, today. Specializing in machine learning and robotics.', websiteUrl: '#', dataAiHint: 'modern logo', tier: 'Platinum' },
  { id: 'sponsor3', name: 'QuantumData Analytics', logoUrl: 'https://picsum.photos/seed/quantumdata/200/100', description: 'Unlocking insights from complex data using cutting-edge quantum computing and AI.', websiteUrl: '#', dataAiHint: 'data logo', tier: 'Gold' },
  { id: 'sponsor4', name: 'ConnectSphere Networks', logoUrl: 'https://picsum.photos/seed/connectsphere/200/100', description: 'Providing robust and secure infrastructure for AI and big data applications.', websiteUrl: '#', dataAiHint: 'network logo', tier: 'Gold' },
  { id: 'sponsor5', name: 'EcoSpark Ventures', logoUrl: 'https://picsum.photos/seed/ecospark/200/100', description: 'Investing in sustainable AI technologies for a greener future.', websiteUrl: '#', dataAiHint: 'green logo', tier: 'Silver' },
  { id: 'sponsor6', name: 'LearnAI Academy', logoUrl: 'https://picsum.photos/seed/learnai/200/100', description: 'Empowering the next generation of AI professionals through comprehensive education programs.', websiteUrl: '#', dataAiHint: 'education logo', tier: 'Silver' },
];

const tierStyles = {
  Platinum: "border-primary shadow-primary/20",
  Gold: "border-yellow-500 dark:border-yellow-400 shadow-yellow-500/20 dark:shadow-yellow-400/20",
  Silver: "border-slate-400 dark:border-slate-500 shadow-slate-400/20 dark:shadow-slate-500/20",
}

const tierTextStyles = {
  Platinum: "text-primary",
  Gold: "text-yellow-500 dark:text-yellow-400",
  Silver: "text-slate-500 dark:text-slate-400",
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

  const tierOrder: ('Platinum' | 'Gold' | 'Silver')[] = ['Platinum', 'Gold', 'Silver'];

  const tierTitles = {
    Platinum: t('sponsors.platinumTierTitle'),
    Gold: t('sponsors.goldTierTitle'),
    Silver: t('sponsors.silverTierTitle'),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Handshake className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold tracking-tight">{t('sponsors.mainTitle')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('sponsors.mainDescription')}
        </p>
      </div>

      {tierOrder.map(tier => (
        groupedSponsors[tier] && (
          <div key={tier} className="mb-12">
            <h3 className={`text-2xl font-semibold text-center mb-8 ${tierTextStyles[tier]}`}>{tierTitles[tier]}</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${tier === 'Platinum' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
              {groupedSponsors[tier].map((sponsor) => (
                <Card key={sponsor.id} className={`flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 ${tierStyles[sponsor.tier]}`}>
                  <CardHeader>
                    <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Image 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} logo`} 
                        width={tier === 'Platinum' ? 200 : 180} 
                        height={tier === 'Platinum' ? 100 : 90}
                        className="object-contain rounded-md"
                        data-ai-hint={sponsor.dataAiHint}
                      />
                    </a>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="text-lg mb-1">{sponsor.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{sponsor.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
