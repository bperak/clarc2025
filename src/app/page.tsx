
"use client"; // Make this a client component to use useTranslation

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClaritySchedule } from '@/components/conference/schedule';
import { SpeakerShowcase } from '@/components/conference/speakers';
import { ClarcAiAssistant } from '@/components/conference/ai-assistant';
import { StreamlinedRegistration } from '@/components/conference/registration';
import { SponsorHighlights } from '@/components/conference/sponsors';
import { VenueSection } from '@/components/conference/venue';
import { AccommodationsSection } from '@/components/conference/accommodations';
import { AboutOpatijaSection } from '@/components/conference/about-opatija';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { BrainCircuit, CalendarDays, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative text-primary-foreground py-24 md:py-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image 
                src="https://www.adrionik.com/img/site/accommod_region_photos/icon/4_001.jpg" 
                alt="Futuristic abstract network connections representing Opatija's blend of history and technology" 
                layout="fill" 
                objectFit="cover"
                className="opacity-20" 
                data-ai-hint="futuristic Opatija"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-transparent to-accent/60 opacity-75"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <BrainCircuit className="mx-auto h-20 w-20 mb-8 text-primary-foreground drop-shadow-lg" />
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-primary-foreground drop-shadow-md">
              {t('hero.titleMain')} <span className="block sm:inline">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-primary-foreground mb-12 drop-shadow-sm">
              {t('hero.subtitle')}
            </p>
            <div className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10 hover:text-background shadow-xl transition-transform hover:scale-105 duration-300 ease-out"
              >
                <Link href="#registration">
                  {t('nav.registerNowButton')} <Ticket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10 hover:text-background shadow-xl transition-transform hover:scale-105 duration-300 ease-out"
              >
                <Link href="#schedule">
                  {t('hero.viewScheduleButton')} <CalendarDays className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">{t('aboutSection.title')}</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
              {t('aboutSection.paragraph')}
            </p>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-16 md:py-24 bg-secondary">
          <ClaritySchedule />
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-16 md:py-24 bg-muted">
          <SpeakerShowcase />
        </section>

        {/* AI Assistant Section */}
        <section id="ai-assistant" className="py-16 md:py-24 bg-secondary">
          <ClarcAiAssistant />
        </section>

        {/* Registration Section */}
        <section id="registration" className="py-16 md:py-24 bg-muted">
          <StreamlinedRegistration />
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-16 md:py-24 bg-secondary">
          <SponsorHighlights />
        </section>

        {/* Venue Section */}
        <section id="venue" className="py-16 md:py-24 bg-muted">
          <VenueSection />
        </section>

        {/* Accommodations Section */}
        <section id="accommodations" className="py-16 md:py-24 bg-secondary">
          <AccommodationsSection />
        </section>

        {/* About Opatija Section */}
        <section id="about-opatija" className="bg-background">
          <AboutOpatijaSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
