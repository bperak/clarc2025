"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, Users } from 'lucide-react';

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
  type: 'Keynote' | 'Workshop' | 'Talk' | 'Panel' | 'Break';
  location: string;
};

const sessionsData: Session[] = [
  // Pre-Conference Day (Day 0)
  { id: 's2', day: 0, time: '10:30 - 12:00', title: 'Workshop 1: Advanced Next.js for AI Applications', description: 'A hands-on session for Next.js enthusiasts focusing on building performant AI interfaces.', speakers: [{ name: 'Marcus Chen', id: 'sp2' }], type: 'Workshop', location: 'Room A' },
  { id: 's7', day: 0, time: '11:00 - 12:30', title: 'Workshop 2: Deploying Scalable AI Models', description: 'Practical guide to deploying AI models in production environments.', speakers: [{ name: 'Janet Lee', id: 'sp7' }], type: 'Workshop', location: 'Room C' }, // Changed location for variety

  // Day 1
  { id: 's1', day: 1, time: '09:00 - 10:00', title: 'Keynote: The Future of AI Collaboration', description: 'An inspiring talk about upcoming trends in collaborative AI research and development.', speakers: [{ name: 'Dr. Evelyn Reed', id: 'sp1' }], type: 'Keynote', location: 'Main Hall' },
  { id: 's3', day: 1, time: '12:00 - 13:00', title: 'Lunch Break', description: 'Network with fellow attendees.', speakers: [], type: 'Break', location: 'Dining Area' },
  { id: 's4', day: 1, time: '13:00 - 14:00', title: 'Talk: Ethical Considerations in AI', description: 'Exploring the ethical landscape of artificial intelligence.', speakers: [{ name: 'Dr. Anya Sharma', id: 'sp3' }], type: 'Talk', location: 'Room B' },
  { id: 's5', day: 1, time: '14:30 - 15:30', title: 'Panel: AI in Healthcare Transformation', description: 'Experts discuss the impact of AI on healthcare.', speakers: [{ name: 'Dr. Ben Carter', id: 'sp4' }, { name: 'Dr. Sofia Ramirez', id: 'sp5' }], type: 'Panel', location: 'Main Hall' },
  
  // Day 2
  { id: 's6', day: 2, time: '09:30 - 10:30', title: 'Keynote: Bridging Human and Machine Intelligence', description: 'Exploring synergies between human cognition and AI capabilities.', speakers: [{ name: 'Prof. Leo Maxwell', id: 'sp6' }], type: 'Keynote', location: 'Main Hall' },
  // Add more Day 2 sessions if needed
  { id: 's8', day: 2, time: '10:30 - 11:30', title: 'Talk: AI in Creative Industries', description: 'How AI is reshaping art, music, and design.', speakers: [{name: 'Alex Rivera', id: 'sp8'}], type: 'Talk', location: 'Room B'},
  { id: 's9', day: 2, time: '11:30 - 12:30', title: 'Networking Coffee Break', description: 'Connect with peers and speakers.', speakers: [], type: 'Break', location: 'Lounge Area'},

];

export function ClaritySchedule() {
  const days = Array.from(new Set(sessionsData.map(s => s.day))).sort((a,b) => a-b);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Conference Schedule</h2>
      <p className="text-muted-foreground text-center mb-10">
        Explore our diverse range of talks, workshops, and networking opportunities.
      </p>
      <Tabs defaultValue={`day-${days[0]}`} className="w-full">
        <TabsList className={`grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-auto lg:mx-auto lg:grid-cols-${days.length > 3 ? 3 : days.length}`}>
          {days.map(day => (
            <TabsTrigger key={`day-trigger-${day}`} value={`day-${day}`}>
              {day === 0 ? 'Pre-Conference' : `Day ${day}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map(day => (
          <TabsContent key={`day-content-${day}`} value={`day-${day}`}>
            <div className="space-y-6 mt-8">
              {sessionsData.filter(session => session.day === day).map((session) => (
                <Card key={session.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{session.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm mt-1">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" /> {session.time}
                          <span className="mx-2 text-muted-foreground">|</span>
                          <span className="font-semibold text-accent">{session.type}</span>
                        </CardDescription>
                      </div>
                      <div className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        {session.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{session.description}</p>
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
                        <CalendarDays className="mr-2 h-4 w-4" /> Add to Calendar
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
              {sessionsData.filter(session => session.day === day).length === 0 && (
                <Card className="shadow-lg">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No sessions scheduled for this day yet. Please check back later.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
