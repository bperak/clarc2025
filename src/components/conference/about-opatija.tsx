"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Train, Car, MapPin } from 'lucide-react';

import { useTranslation } from 'react-i18next';

export function AboutOpatijaSection() {
  const { t } = useTranslation();
  return ( 
    <div className="relative text-primary-foreground py-20 md:py-32 overflow-hidden">
      {/* Background Image with Animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.mycroatiacruise.com/storage/destinations/opatija.jpg"
          alt="Scenic view of Opatija, Croatia with its coastline and historic buildings"
          layout="fill"
          objectFit="cover"
          className="opatija-bg-animate"
          data-ai-hint="Opatija Croatia"
          priority // Preload this large image
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div> {/* Gradient overlay for better text readability */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <MapPin className="mx-auto h-12 w-12 mb-4 text-accent" />
          <h2 className="text-4xl font-bold tracking-tight mb-4">{t('discoverOpatijaTitle')}</h2>
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/90">
            {t('discoverOpatijaDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-background/80 dark:bg-card/70 backdrop-blur-md text-foreground shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Plane className="mr-3 h-6 w-6 text-primary" /> {t('howToArriveTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>{t('howToArriveByAir')}</p>
              <p>{t('howToArriveByTrain')}</p>
              <p>{t('howToArriveByCar')}</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 dark:bg-card/70 backdrop-blur-md text-foreground shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl">{t('thingsToExperienceTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc list-inside space-y-2">
                <li>{t('thingsToExperienceLungomare')}</li>
                <li>{t('thingsToExperienceVillaAngiolina')}</li>
                <li>{t('thingsToExperienceParkSvJakova')}</li>
                <li>{t('thingsToExperienceMaidenSeagull')}</li>
                <li>{t('thingsToExperienceStreets')}</li>
                <li>{t('thingsToExperienceUckaPark')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
