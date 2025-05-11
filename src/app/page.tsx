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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-primary/80 via-primary to-accent/70 text-primary-foreground py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <Image 
                src="https://picsum.photos/seed/conferencebg/1920/1080" 
                alt="Abstract background" 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="abstract network"
             />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <BrainCircuit className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              CLARC 2025: <span className="block sm:inline">Bridging Minds</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-10">
              Join leading researchers, innovators, and thinkers to explore the future of Artificial Intelligence and collaborative discovery.
            </p>
            <div className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90 shadow-lg transition-transform hover:scale-105">
                <Link href="#registration">
                  Register Now <Ticket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 shadow-lg transition-transform hover:scale-105">
                <Link href="#schedule">
                  View Schedule <CalendarDays className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section (Optional - simple text for now) */}
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">About CLARC 2025</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
              CLARC 2025 is more than just a conference; it's a confluence of ideas, a platform for groundbreaking discussions, and a catalyst for future collaborations in the realm of Artificial Intelligence. We aim to bridge the gap between theoretical research and practical application, fostering an environment where minds meet and innovation thrives.
            </p>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-16 md:py-24 bg-secondary">
          <ClaritySchedule />
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-16 md:py-24 bg-background">
          <SpeakerShowcase />
        </section>

        {/* AI Assistant Section */}
        <section id="ai-assistant" className="py-16 md:py-24 bg-secondary">
          <ClarcAiAssistant />
        </section>

        {/* Registration Section */}
        <section id="registration" className="py-16 md:py-24 bg-background">
          <StreamlinedRegistration />
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-16 md:py-24 bg-secondary">
          <SponsorHighlights />
        </section>

        {/* Venue Section */}
        <section id="venue" className="py-16 md:py-24 bg-background">
          <VenueSection />
        </section>

        {/* Accommodations Section */}
        <section id="accommodations" className="py-16 md:py-24 bg-secondary">
          <AccommodationsSection />
        </section>

        {/* About Opatija Section */}
        <section id="about-opatija" className="bg-background"> {/* No top/bottom padding here, handled by component */}
          <AboutOpatijaSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
