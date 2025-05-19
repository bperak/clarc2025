"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Hotel } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Hotel images - Grand Hotel 4 Opatijska Cvijeta
const hotelImages = [
  {
    src: "https://cdn.webhotelier.net/photos/w=1920/grand4/L563110.jpg",
    alt: "Grand Hotel 4 Opatijska Cvijeta - Exterior"
  },
  {
    src: "https://www.liburnia.hr/datastore/imagestore/original/1581344849Grand-Hotel-4-Opatijska-Cvijeta-Lobby.jpg",
    alt: "Grand Hotel 4 Opatijska Cvijeta - Lobby"
  },
  {
    src: "https://www.liburnia.hr/datastore/imagestore/original/1590758025Grand-Hotel-4-Opatijska-Cvijeta-Conference.jpg",
    alt: "Grand Hotel 4 Opatijska Cvijeta - Conference Room"
  },
  {
    src: "https://www.liburnia.hr/datastore/imagestore/original/1581344922Grand-Hotel-4-Opatijska-Cvijeta-Room.jpg",
    alt: "Grand Hotel 4 Opatijska Cvijeta - Room"
  },
  {
    src: "https://www.liburnia.hr/datastore/imagestore/original/1581345013Grand-Hotel-4-Opatijska-Cvijeta-Restaurant.jpg",
    alt: "Grand Hotel 4 Opatijska Cvijeta - Restaurant"
  }
];

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
      <Card className="max-w-4xl mx-auto shadow-xl overflow-hidden rounded-lg">
        <div className="flex flex-col">
          <div className="w-full h-[400px] relative overflow-hidden">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {hotelImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-[400px] relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
          
          <div className="p-8 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl">Grand Hotel 4 Opatijska Cvijeta</CardTitle>
              <CardDescription className="flex items-center text-sm mt-1">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> Viktora Cara Emina 6, 51410 Opatija, Croatia
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-6">
                Located in the heart of Opatija, Grand Hotel 4 Opatijska Cvijeta offers elegant accommodation with stunning views of the Adriatic Sea. The hotel features spacious conference facilities, luxurious rooms, and excellent dining options, making it the perfect venue for CLARC2025.
              </p>
              <Button asChild>
                <a href="https://www.amadriapark.com/hr/hotel/amadria-park-grand-hotel-4-opatijska-cvijeta-opatija-beach-family-hotel" target="_blank" rel="noopener noreferrer">
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
