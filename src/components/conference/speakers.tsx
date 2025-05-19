"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Twitter, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

type Speaker = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  dataAiHint: string;
  confirmed: boolean;
  isPlaceholder?: boolean;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
};

const speakersData: Speaker[] = [
  { 
    id: 'sp1', 
    name: 'Benedikt Perak', 
    title: 'Researcher, University of Rijeka', 
    bio: 'Expert in cognitive linguistics, digital humanities, and AI applications in language research.', 
    photoUrl: 'https://picsum.photos/seed/benedikt/300/300', 
    dataAiHint: 'professor man',
    confirmed: true,
    socials: { linkedin: '#', twitter: '#' } 
  },
  { 
    id: 'sp2', 
    name: 'Renata Geld', 
    title: 'Professor, University of Zagreb', 
    bio: 'Specializing in cognitive linguistics, language acquisition, and educational technology applications.', 
    photoUrl: 'https://picsum.photos/seed/renata/300/300', 
    dataAiHint: 'professor woman',
    confirmed: true,
    socials: { linkedin: '#', twitter: '#' } 
  },
  { 
    id: 'sp3', 
    name: 'Tony Veale', 
    title: 'Professor of Computer Science, University College Dublin', 
    bio: 'Leading researcher in computational creativity, figurative language processing, and AI-generated humor.', 
    photoUrl: 'https://picsum.photos/seed/tony/300/300', 
    dataAiHint: 'professor man',
    confirmed: false,
    socials: { linkedin: '#', twitter: '#' } 
  },
  { 
    id: 'placeholder1', 
    name: 'Speaker To Be Announced', 
    title: 'Coming Soon', 
    bio: 'We are in the process of confirming more expert speakers. Check back soon for updates!', 
    photoUrl: '', 
    dataAiHint: 'unknown person',
    confirmed: false,
    isPlaceholder: true
  },
  { 
    id: 'placeholder2', 
    name: 'Speaker To Be Announced', 
    title: 'Coming Soon', 
    bio: 'We are in the process of confirming more expert speakers. Check back soon for updates!', 
    photoUrl: '', 
    dataAiHint: 'unknown person',
    confirmed: false,
    isPlaceholder: true
  },
  { 
    id: 'placeholder3', 
    name: 'Speaker To Be Announced', 
    title: 'Coming Soon', 
    bio: 'We are in the process of confirming more expert speakers. Check back soon for updates!', 
    photoUrl: '', 
    dataAiHint: 'unknown person',
    confirmed: false,
    isPlaceholder: true
  }
];

export function SpeakerShowcase() {
  const { t } = useTranslation();

  return (
    <section id="speakers" className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png" // Placeholder, can be changed
          alt="Abstract network or futuristic background for speakers section"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="abstract network"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-primary/40 to-accent/40 opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2 text-primary-foreground drop-shadow-md">{t('speakers.mainTitle')}</h2>
        <p className="text-primary-foreground/90 text-center mb-10 drop-shadow-sm">
          {t('speakers.mainDescription')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakersData.map((speaker) => (
            <Card key={speaker.id} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 dark:bg-card/80 backdrop-blur-sm ${speaker.isPlaceholder ? 'border border-dashed border-muted' : ''}`}>
              <CardHeader className="items-center text-center">
                {speaker.isPlaceholder ? (
                  <div className="w-32 h-32 mb-4 flex items-center justify-center rounded-full bg-muted/40">
                    <HelpCircle className="h-16 w-16 text-muted-foreground/40" />
                  </div>
                ) : (
                  <Avatar className="w-32 h-32 mb-4 border-4 border-primary/50">
                    <AvatarImage src={speaker.photoUrl} alt={speaker.name} data-ai-hint={speaker.dataAiHint} />
                    <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}
                <CardTitle className="text-xl text-card-foreground">
                  {speaker.name}
                  {!speaker.confirmed && !speaker.isPlaceholder && <span className="ml-2 text-sm text-muted-foreground">(TBC)</span>}
                </CardTitle>
                <CardDescription className="text-primary">{speaker.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground text-center">{speaker.bio}</p>
              </CardContent>
              {!speaker.isPlaceholder && speaker.socials && (
                <CardFooter className="flex justify-center space-x-3 pt-4">
                  {speaker.socials?.linkedin && (
                    <Button variant="outline" size="icon" asChild className="border-muted-foreground/50 hover:bg-accent/20">
                      <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} LinkedIn`}>
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {speaker.socials?.twitter && (
                    <Button variant="outline" size="icon" asChild className="border-muted-foreground/50 hover:bg-accent/20">
                      <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} Twitter`}>
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

