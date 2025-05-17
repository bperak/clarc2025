
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, CalendarClock, ChevronRight, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function CallForPapersSection() {
  const { t } = useTranslation();

  const keyThemes = [
    'callForPapers.theme1',
    'callForPapers.theme2',
    'callForPapers.theme3',
    'callForPapers.theme4',
    'callForPapers.theme5',
    'callForPapers.theme6',
    'callForPapers.theme7',
  ];

  const importantDates = [
    { labelKey: 'callForPapers.submissionDeadlineLabel', dateKey: 'callForPapers.submissionDeadlineDate' },
    { labelKey: 'callForPapers.acceptanceNotificationLabel', dateKey: 'callForPapers.acceptanceNotificationDate' },
    { labelKey: 'callForPapers.conferenceDatesLabel', dateKey: 'callForPapers.conferenceDatesValue' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden rounded-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Newspaper className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">{t('callForPapers.title')}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-1">{t('callForPapers.conferenceTheme')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 md:px-8">
          <p className="text-muted-foreground text-center md:text-left">
            {t('callForPapers.invitation')}
          </p>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              {t('callForPapers.keyThemesTitle')}
            </h3>
            <ul className="list-none space-y-2 pl-0">
              {keyThemes.map((themeKey) => (
                <li key={themeKey} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{t(themeKey)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-primary" />
              {t('callForPapers.importantDatesTitle')}
            </h3>
            <ul className="list-none space-y-2 pl-0">
              {importantDates.map((dateItem) => (
                 <li key={dateItem.labelKey} className="flex items-start">
                   <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                   <span className="text-muted-foreground">
                     <strong>{t(dateItem.labelKey)}:</strong> {t(dateItem.dateKey)}
                   </span>
                 </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{t('callForPapers.submissionGuidelinesTitle')}</h3>
            <p className="text-muted-foreground">
              {t('callForPapers.submissionGuidelinesText')} 
              {/* In a real app, the placeholder [Link] would be an actual link component */}
            </p>
          </div>

          <p className="text-center font-semibold text-foreground text-lg pt-4">
            {t('callForPapers.joinUsText')}
          </p>
          
          <div className="text-center pt-2">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 duration-300 ease-out">
              {/* Placeholder link, replace with actual submission link */}
              <Link href="#"> 
                {t('callForPapers.submitPaperButton')}
                <Newspaper className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
