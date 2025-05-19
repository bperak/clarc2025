/**
 * @fileOverview ClaritySchedule component displays the conference schedule using tabs for different days.
 * It fetches session data and organizes it by day, allowing users to switch between days.
 * On mobile, the tab selection buttons are displayed as a column.
 * On larger screens, tabs are displayed horizontally.
 * The TabsList is always positioned above the TabsContent.
 */
"use client";

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type SessionSpeaker = {
  name: string;
  id: string;
};

type Session = {
  id: string;
  time: string;
  title: string;
  description: string;
  speakers: SessionSpeaker[];
  day: number; // 0 for Pre-Conference, 1 for Day 1, etc.
  type: 'Keynote' | 'Workshop' | 'Talk' | 'Panel' | 'Break' | 'Social';
  location: string;
};

const sessionsData: Session[] = [
  // Pre-Conference Day (November 5, 2025)
  { 
    id: 'classla', 
    day: 0, 
    time: '10:00 - 12:30', 
    title: 'CLASSLA-express Workshop', 
    description: 'A practical workshop on language processing tools for South Slavic languages, led by Ivana Filipović Petrović and Nikola Ljubešić.', 
    speakers: [
      { name: 'Ivana Filipović Petrović', id: 'ifp' },
      { name: 'Nikola Ljubešić', id: 'nl' }
    ], 
    type: 'Workshop', 
    location: 'Faculty of Philosophy, University of Rijeka' 
  },
  { 
    id: 'lunch_break', 
    day: 0, 
    time: '12:30 - 14:00', 
    title: 'Lunch Break', 
    description: 'Network with fellow attendees and workshop participants.', 
    speakers: [], 
    type: 'Break', 
    location: 'University Cafeteria' 
  },
  { 
    id: 'tbd_workshop', 
    day: 0, 
    time: '14:00 - 16:30', 
    title: 'Additional Workshop (TBD)', 
    description: 'More information about this workshop will be announced soon.', 
    speakers: [], 
    type: 'Workshop', 
    location: 'Faculty of Philosophy, University of Rijeka' 
  },
  { 
    id: 'integrated_study', 
    day: 0, 
    time: '17:00 - 18:00', 
    title: 'Integrated Study Presentation: FER and FFZG', 
    description: 'Presentation of the integrated study program between Faculty of Electrical Engineering and Computing (FER) and Faculty of Humanities and Social Sciences (FFZG) focusing on Applied Cognitive Science.', 
    speakers: [], 
    type: 'Talk', 
    location: 'Faculty of Philosophy, Main Lecture Hall' 
  },

  // Day 1 (November 6, 2025)
  { 
    id: 'keynote_day1', 
    day: 1, 
    time: '09:00 - 10:00', 
    title: 'Opening Keynote: The Future of Language Research in the Age of AI', 
    description: 'An inspiring talk exploring the evolving landscape of language research and how artificial intelligence is transforming linguistic studies.', 
    speakers: [{ name: 'Benedikt Perak', id: 'bp1' }], 
    type: 'Keynote', 
    location: 'Main Hall' 
  },
  { 
    id: 'coffee_break_morning1', 
    day: 1, 
    time: '10:00 - 10:15', 
    title: 'Coffee Break', 
    description: 'Short break before the parallel sessions.', 
    speakers: [], 
    type: 'Break', 
    location: 'Foyer' 
  },
  { 
    id: 'parallel_1a', 
    day: 1, 
    time: '10:15 - 10:40', 
    title: 'Parallel Session 1A: NLP Applications in Croatian', 
    description: 'Research presentation on natural language processing applications specifically designed for Croatian language (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd1' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_1b', 
    day: 1, 
    time: '10:15 - 10:40', 
    title: 'Parallel Session 1B: Digital Language Archives', 
    description: 'Exploring how AI helps in creating and maintaining digital language archives for preservation (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd2' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'parallel_2a', 
    day: 1, 
    time: '10:45 - 11:10', 
    title: 'Parallel Session 2A: Language Model Biases', 
    description: 'Examination of inherent biases in language models and strategies for mitigation (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd3' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_2b', 
    day: 1, 
    time: '10:45 - 11:10', 
    title: 'Parallel Session 2B: Sentiment Analysis Tools', 
    description: 'Presentation of advanced sentiment analysis tools for South Slavic languages (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd4' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'parallel_3a', 
    day: 1, 
    time: '11:15 - 11:40', 
    title: 'Parallel Session 3A: Machine Translation Challenges', 
    description: 'Discussion of specific challenges in machine translation for morphologically rich languages (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd5' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_3b', 
    day: 1, 
    time: '11:15 - 11:40', 
    title: 'Parallel Session 3B: AI in Educational Linguistics', 
    description: 'Applications of AI in language education and learning research (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd6' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'parallel_4a', 
    day: 1, 
    time: '11:45 - 12:10', 
    title: 'Parallel Session 4A: Corpus Linguistics and AI', 
    description: 'How AI is transforming corpus linguistics methodologies and analysis (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd7' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_4b', 
    day: 1, 
    time: '11:45 - 12:10', 
    title: 'Parallel Session 4B: Ethical Dimensions of Language AI', 
    description: 'Exploring ethical considerations in developing and deploying language AI systems (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd8' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'lunch_day1', 
    day: 1, 
    time: '12:15 - 14:00', 
    title: 'Lunch Break', 
    description: 'Extended networking lunch with exhibition of sponsor booths.', 
    speakers: [], 
    type: 'Break', 
    location: 'Conference Restaurant' 
  },
  { 
    id: 'keynote_day1_afternoon', 
    day: 1, 
    time: '14:00 - 15:00', 
    title: 'Afternoon Keynote: Cognitive Aspects of AI Language Processing', 
    description: 'Examining how AI language processing models relate to human cognitive processes.', 
    speakers: [{ name: 'Renata Geld', id: 'rg1' }], 
    type: 'Keynote', 
    location: 'Main Hall' 
  },
  { 
    id: 'coffee_break_afternoon1', 
    day: 1, 
    time: '15:00 - 15:30', 
    title: 'Coffee Break', 
    description: 'Afternoon refreshments and networking.', 
    speakers: [], 
    type: 'Break', 
    location: 'Foyer' 
  },
  { 
    id: 'parallel_5a', 
    day: 1, 
    time: '15:30 - 15:55', 
    title: 'Parallel Session 5A: Computational Linguistics Methods', 
    description: 'Advanced computational methods for linguistic analysis (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd9' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_5b', 
    day: 1, 
    time: '15:30 - 15:55', 
    title: 'Parallel Session 5B: Social Media Language Analysis', 
    description: 'AI techniques for analyzing language patterns on social media platforms (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd10' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'parallel_6a', 
    day: 1, 
    time: '16:00 - 16:25', 
    title: 'Parallel Session 6A: Language Model Fine-tuning', 
    description: 'Strategies for fine-tuning large language models for specific linguistic tasks (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd11' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_6b', 
    day: 1, 
    time: '16:00 - 16:25', 
    title: 'Parallel Session 6B: Multimodal Language Processing', 
    description: 'Integrating text, speech, and visual data in language processing systems (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd12' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'roundtable_day1', 
    day: 1, 
    time: '17:00 - 18:30', 
    title: 'Round Table: The Future of Language in the Age of AI', 
    description: 'Expert discussion on how AI will transform language research, usage, and preservation in the coming decades, featuring leading academics and industry representatives.', 
    speakers: [
      { name: 'Tadić', id: 'tadic' },
      { name: 'Krek', id: 'krek' },
      { name: 'Ranka Stankovic', id: 'rs' },
      { name: 'CARNET Representative', id: 'carnet' },
      { name: 'BRAIN CARNET Representative', id: 'brain' },
      { name: 'Algebra Representative', id: 'algebra' }
    ], 
    type: 'Panel', 
    location: 'Main Hall' 
  },
  { 
    id: 'conference_dinner', 
    day: 1, 
    time: '19:30 - 22:00', 
    title: 'Conference Dinner', 
    description: 'Formal dinner and networking event for all conference participants with Croatian cuisine and cultural program.', 
    speakers: [], 
    type: 'Social', 
    location: 'Hotel Restaurant (Details to be announced)' 
  },

  // Day 2 (November 7, 2025)
  { 
    id: 'keynote_day2', 
    day: 2, 
    time: '09:00 - 10:00', 
    title: 'Day 2 Keynote: Computational Creativity in Language', 
    description: 'Exploring how AI systems exhibit creative behaviors in language generation and processing.', 
    speakers: [{ name: 'Tony Veale', id: 'tv1' }], 
    type: 'Keynote', 
    location: 'Main Hall' 
  },
  { 
    id: 'coffee_break_morning2', 
    day: 2, 
    time: '10:00 - 10:15', 
    title: 'Coffee Break', 
    description: 'Morning refreshments.', 
    speakers: [], 
    type: 'Break', 
    location: 'Foyer' 
  },
  { 
    id: 'sponsor_showcase_1', 
    day: 2, 
    time: '10:15 - 10:45', 
    title: 'Sponsor Showcase: Microsoft Language AI Solutions', 
    description: 'Presentation of Microsoft\'s latest advancements in language AI technologies and research tools.', 
    speakers: [{ name: 'Microsoft Representative', id: 'ms1' }], 
    type: 'Talk', 
    location: 'Main Hall' 
  },
  { 
    id: 'sponsor_showcase_2', 
    day: 2, 
    time: '10:50 - 11:20', 
    title: 'Sponsor Showcase: OpenAI Applications in Linguistics', 
    description: 'Demonstration of OpenAI\'s tools and APIs for linguistic research and education.', 
    speakers: [{ name: 'OpenAI Representative', id: 'oai1' }], 
    type: 'Talk', 
    location: 'Main Hall' 
  },
  { 
    id: 'innovative_format_1', 
    day: 2, 
    time: '11:30 - 12:30', 
    title: 'Interactive Workshop: Hands-on with Language Models', 
    description: 'Participatory session where attendees can experiment with language models for research purposes.', 
    speakers: [{ name: 'Workshop Facilitator', id: 'wf1' }], 
    type: 'Workshop', 
    location: 'Computer Lab' 
  },
  { 
    id: 'lunch_day2', 
    day: 2, 
    time: '12:30 - 14:00', 
    title: 'Lunch Break', 
    description: 'Continued networking with sponsor exhibition.', 
    speakers: [], 
    type: 'Break', 
    location: 'Conference Restaurant' 
  },
  { 
    id: 'parallel_7a', 
    day: 2, 
    time: '14:00 - 14:25', 
    title: 'Parallel Session 7A: Dialectal Language Processing', 
    description: 'Challenges and solutions in processing dialectal variations with AI (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd13' }], 
    type: 'Talk', 
    location: 'Room A' 
  },
  { 
    id: 'parallel_7b', 
    day: 2, 
    time: '14:00 - 14:25', 
    title: 'Parallel Session 7B: Language Preservation Technologies', 
    description: 'How AI can assist in preserving endangered languages and dialects (20 min + 5 min Q&A).', 
    speakers: [{ name: 'Speaker TBD', id: 'tbd14' }], 
    type: 'Talk', 
    location: 'Room B' 
  },
  { 
    id: 'sponsor_showcase_3', 
    day: 2, 
    time: '14:30 - 15:00', 
    title: 'Sponsor Showcase: InfoBip Communication AI', 
    description: 'Presentation of InfoBip\'s AI-powered communication platforms and language processing capabilities.', 
    speakers: [{ name: 'InfoBip Representative', id: 'ib1' }], 
    type: 'Talk', 
    location: 'Main Hall' 
  },
  { 
    id: 'panel_industry_academic', 
    day: 2, 
    time: '15:15 - 16:15', 
    title: 'Panel: Industry-Academic Collaboration in Language AI', 
    description: 'Discussion on fostering meaningful partnerships between academic linguists and industry AI developers.', 
    speakers: [
      { name: 'Academic Representative', id: 'ac1' },
      { name: 'Industry Representative', id: 'in1' },
      { name: 'Government Representative', id: 'gov1' }
    ], 
    type: 'Panel', 
    location: 'Main Hall' 
  },
  { 
    id: 'awards_closing', 
    day: 2, 
    time: '16:30 - 17:30', 
    title: 'Awards Ceremony and Closing Remarks', 
    description: 'Presentation of awards for outstanding papers and research, followed by closing statements and future conference announcements.', 
    speakers: [{ name: 'Conference Chair', id: 'chair1' }], 
    type: 'Social', 
    location: 'Main Hall' 
  },
  { 
    id: 'networking_reception', 
    day: 2, 
    time: '17:30 - 19:00', 
    title: 'Closing Networking Reception', 
    description: 'Final opportunity to connect with colleagues and discuss potential collaborations.', 
    speakers: [], 
    type: 'Social', 
    location: 'Foyer' 
  }
];

// Helper to sort sessions by time for each day
const getSortedSessionsForDay = (day: number): Session[] => {
  return sessionsData
    .filter(session => session.day === day)
    .sort((a, b) => {
      const timeA = a.time.split(' - ')[0];
      const timeB = b.time.split(' - ')[0];
      return timeA.localeCompare(timeB);
    });
};


export function ClaritySchedule() {
  const { t } = useTranslation();
  const days = Array.from(new Set(sessionsData.map(s => s.day))).sort((a,b) => a-b);

  const sessionTypeTranslations = {
    Keynote: t('sessionTypeKeynote'),
    Workshop: t('sessionTypeWorkshop'),
    Talk: t('sessionTypeTalk'),
    Panel: t('sessionTypePanel'),
    Break: t('sessionTypeBreak'),
    Social: t('sessionTypeSocial')
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2">{t('scheduleTitle')}</h2>
      <p className="text-muted-foreground text-center mb-10">
        {t('scheduleDescription')}
      </p>
      <Tabs defaultValue={`day-${days[0]}`} className="w-full flex flex-col">
        {/* Tab List - Always above content */}
        <TabsList 
          className={cn(
            "order-1 mb-8", // Ensure TabsList is first and has bottom margin

            // Mobile specific styling for the list (column layout):
            "flex flex-col w-full gap-2", 
            "p-0 bg-transparent rounded-none", 

            // sm and up styling for the list (row/grid layout):
            "sm:grid sm:gap-1", 
            "sm:rounded-md sm:bg-muted sm:p-1", 
            "sm:w-full",
            // Responsive grid columns for sm+
            `sm:grid-cols-2 md:grid-cols-3 lg:w-auto lg:mx-auto lg:grid-cols-${days.length > 3 ? 3 : days.length}`
          )}
        >
          {days.map(day => (
            <TabsTrigger 
              key={`day-trigger-${day}`} 
              value={`day-${day}`}
              className="w-full sm:w-auto" // Triggers are full-width on mobile, auto on sm+
            >
              {day === 0 ? t('preConferenceTab') : `${t('dayTab')}${day}`}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Tab Content - Always below TabsList */}
        <div className="order-2 w-full">
          {days.map(day => (
            <TabsContent 
              key={`day-content-${day}`} 
              value={`day-${day}`}
              // No sm:mt-8 needed here as TabsList provides spacing with mb-8
            >
              <div className="space-y-6">
                {getSortedSessionsForDay(day).map((session) => (
                  <Card key={session.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-primary">{t(`session_${session.id}_title`, session.title)}</CardTitle>
                          <CardDescription className="flex items-center text-sm mt-1">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" /> {session.time}
                            <span className="mx-2 text-muted-foreground">|</span>
                            <span className="font-semibold text-accent">{sessionTypeTranslations[session.type]}</span>
                          </CardDescription>
                        </div>
                        <div className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full whitespace-nowrap">
                          {session.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{t(`session_${session.id}_description`, session.description)}</p>
                    </CardContent>
                    {session.speakers.length > 0 && (
                      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                         <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                          {session.speakers.length === 1 ? <User className="h-4 w-4 text-primary" /> : <Users className="h-4 w-4 text-primary" />}
                          <span className="text-sm font-medium">
                            {session.speakers.map(sp => sp.name).join(', ')}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          <CalendarDays className="mr-2 h-4 w-4" /> {t('addToCalendarButtonText')}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
                {getSortedSessionsForDay(day).length === 0 && (
                  <Card className="shadow-lg">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      {t('noSessionsScheduled')}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
