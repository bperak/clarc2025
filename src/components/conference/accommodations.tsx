"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const accommodationOptions = [
  {
    name: "Hotel Royal",
    description: "Luxurious accommodation with stunning sea views, offering a premium experience in Opatija.",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/13/b9/20/0d/hotel-royal-royal-beach.jpg",
    dataAiHint: "luxury hotel room",
    websiteUrl: "https://www.amadriapark.com/hotel/amadria-park-hotel-royal" // Replace with actual link
  },
  {
    name: "Hotel Continental",
    description: "A charming hotel known for its historic architecture and central location, perfect for exploring Opatija.",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/d6/3a/36/hotel-continental.jpg?w=900&h=500&s=1",
    dataAiHint: "historic hotel facade",
    websiteUrl: "https://www.amadriapark.com/hotel/amadria-park-hotel-continental" // Replace with actual link
  }
];


export function AccommodationsSection() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <BedDouble className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold tracking-tight">{t('accommodationOptionsTitle')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('accommodationOptionsDescription')}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {accommodationOptions.map((hotel) => (
          <Card key={hotel.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg overflow-hidden">
            <div className="relative h-60 w-full">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                className="object-cover"
                data-ai-hint={hotel.dataAiHint}
              />
            </div>
            <CardHeader className="p-6">
              <CardTitle>{hotel.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
              <p className="text-muted-foreground mb-4">
                {t(
                  `hotel${hotel.name
                    .replace(/^Hotel\s+/i, '') // Remove leading "Hotel " if present
                    .replace(/\s/g, '')}Description`
                )}
              </p>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button asChild variant="outline" className="w-full">
                <a href={hotel.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {t('viewHotelButtonText')} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
