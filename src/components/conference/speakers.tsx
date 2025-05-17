
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

type Speaker = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  dataAiHint: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
};

const speakersData: Speaker[] = [
  { id: 'sp1', name: 'Dr. Evelyn Reed', title: 'Chief Innovation Officer, AI Dynamics', bio: 'Pioneering research in AI ethics and collaborative development. Dr. Reed is a leading voice in shaping the future of artificial intelligence.', photoUrl: 'https://picsum.photos/seed/evelyn/300/300', dataAiHint: 'scientist woman', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp2', name: 'Marcus Chen', title: 'Senior Software Engineer, QuantumLeap AI', bio: 'Core contributor to several open-source AI frameworks and an expert in scalable Next.js applications.', photoUrl: 'https://picsum.photos/seed/marcus/300/300', dataAiHint: 'developer man', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp3', name: 'Dr. Anya Sharma', title: 'Professor of AI Ethics, Tech University', bio: 'Dr. Sharma\'s work focuses on the societal impact of AI and the development of responsible AI guidelines.', photoUrl: 'https://picsum.photos/seed/anya/300/300', dataAiHint: 'professor woman', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp4', name: 'Dr. Ben Carter', title: 'Lead AI Researcher, HealthForward AI', bio: 'Innovating at the intersection of AI and healthcare, Dr. Carter is dedicated to improving patient outcomes through technology.', photoUrl: 'https://picsum.photos/seed/ben/300/300', dataAiHint: 'doctor man', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp5', name: 'Dr. Sofia Ramirez', title: 'AI Ethicist & Policy Advisor', bio: 'Dr. Ramirez advises governments and organizations on creating ethical AI policies and frameworks.', photoUrl: 'https://picsum.photos/seed/sofia/300/300', dataAiHint: 'advisor woman', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp6', name: 'Prof. Leo Maxwell', title: 'Cognitive Science Chair, Institute of Mind Studies', bio: 'A renowned expert in human-computer interaction and the cognitive aspects of AI.', photoUrl: 'https://picsum.photos/seed/leo/300/300', dataAiHint: 'professor man', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp7', name: 'Janet Lee', title: 'Lead DevOps Engineer, CloudScale Inc.', bio: 'Specializing in scalable AI infrastructure and MLOps, Janet ensures models perform reliably.', photoUrl: 'https://picsum.photos/seed/janet/300/300', dataAiHint: 'engineer woman', socials: { linkedin: '#', twitter: '#' } },
  { id: 'sp8', name: 'Alex Rivera', title: 'Digital Artist & AI Researcher', bio: 'Exploring the fusion of AI and creativity, Alex produces stunning visual art and tools.', photoUrl: 'https://picsum.photos/seed/alexrivera/300/300', dataAiHint: 'artist person', socials: { linkedin: '#', twitter: '#' } },
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
            <Card key={speaker.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 dark:bg-card/80 backdrop-blur-sm"> {/* Added backdrop-blur and slight transparency to cards */}
              <CardHeader className="items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary/50">
                  <AvatarImage src={speaker.photoUrl} alt={speaker.name} data-ai-hint={speaker.dataAiHint} />
                  <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-card-foreground">{speaker.name}</CardTitle>
                <CardDescription className="text-primary">{speaker.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground text-center">{speaker.bio}</p>
              </CardContent>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

