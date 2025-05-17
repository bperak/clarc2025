"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Hotel } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function VenueSection() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Hotel className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold tracking-tight">{t('venue.mainTitle')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('venue.mainDescription')}
        </p>
      </div>
      <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden rounded-lg">
        <div className="md:flex">
          <div className="md:shrink-0 md:w-1/2 relative h-64 md:h-auto">
            <Image
              src="https://picsum.photos/seed/grandhotel/600/400"
              alt="Grand Hotel 4 Opatijska Cvijeta exterior"
              layout="fill"
              objectFit="cover"
              className="md:rounded-l-lg md:rounded-tr-none rounded-t-lg"
              data-ai-hint="luxury hotel exterior"
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl">Grand Hotel 4 Opatijska Cvijeta</CardTitle>
              <CardDescription className="flex items-center text-sm mt-1">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> Viktora Cara Emina 6, 51410 Opatija, Croatia
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-6">
                {t('venue.hotelSpecificDescription')}
              </p>
              <Button asChild>
                <a href="https://www.liburnia.hr/en/hotel-grand-4-opatijska-cvijeta" target="_blank" rel="noopener noreferrer">
                  {t('venue.visitHotelButtonText')}
                </a>
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
