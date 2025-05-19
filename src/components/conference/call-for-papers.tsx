"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, CalendarClock, ChevronRight, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function CallForPapersSection() {
  const { t } = useTranslation();

  // Updated to match the topics in upute_za_konferenciju.txt
  const keyThemes = [
    { id: 'theme1', title: 'NLP and Artificial Intelligence', 
      details: [
        'Novel models for language understanding, including large language models',
        'Semantic analysis, entity recognition, and text categorization',
        'Adaptation of NLP models for less-represented languages',
        'Automated language processing systems for sentiment and dialogue',
        'Real-world NLP applications in chatbots and translations'
      ] 
    },
    { id: 'theme2', title: 'Digital Language Reality and Data in Global Society', 
      details: [
        'Digital literacy and impact of new media on language structures',
        'Collection of language data in digital environments',
        'Differences between digital and traditional spoken language',
        'Language rights and policy in digitalization context',
        "AI's influence on language communities and preservation"
      ] 
    },
    { id: 'theme3', title: 'Machine Translation and Language Analysis Algorithms', 
      details: [
        'New approaches to machine translation (neural networks, transformers)',
        'Algorithm adaptation for specific language pairs',
        'Techniques for improving accuracy of machine translation',
        'Integration of machine translation with NLP methods',
        'Automation of proofreading processes'
      ] 
    },
    { id: 'theme4', title: 'Ethics and Social Impact of Language Technologies', 
      details: [
        'Privacy and data protection in NLP and language processing',
        'Biases in language models and algorithms',
        'Impact on employment, especially in translation and journalism',
        'Ethical approaches for developing models for smaller languages',
        'Application in social contexts and implications for inclusion'
      ] 
    }
  ];

  // Updated dates from upute_za_konferenciju.txt
  const importantDates = [
    { label: 'Extended Abstract Submission Deadline', date: 'June 15, 2025' },
    { label: 'Notification of Acceptance', date: 'To be determined' },
    { label: 'First Call', date: 'July 15, 2025' },
    { label: 'Second Call', date: 'September 15, 2025' },
    { label: 'Program Announcement', date: 'October 1, 2025' },
    { label: 'Conference Dates', date: 'November 6-7, 2025' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto shadow-xl overflow-hidden rounded-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Newspaper className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Call for Papers</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-1">
            Perspectives of Language Research in the Age of Artificial Intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-6 pb-8 md:px-8">
          <p className="text-muted-foreground text-center md:text-left leading-relaxed">
            In an era where technological achievements are reshaping reality, language—the foundation of human communication, 
            culture, and identity—is no longer solely the domain of philological research. This conference aims to bring 
            together academia and industry in the field of language technologies. We invite submissions addressing empirical, 
            theoretical, and methodological questions related to the themes below.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Key Themes
            </h3>
            
            {keyThemes.map((theme) => (
              <div key={theme.id} className="mb-6">
                <h4 className="text-lg font-medium text-foreground mb-2">{theme.title}</h4>
                <ul className="list-none space-y-1.5 pl-4">
                  {theme.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-primary" />
              Important Dates
            </h3>
            <ul className="list-none space-y-2 pl-0">
              {importantDates.map((dateItem, index) => (
                 <li key={index} className="flex items-start">
                   <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                   <span className="text-muted-foreground">
                     <strong>{dateItem.label}:</strong> {dateItem.date}
                   </span>
                 </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Submission Guidelines</h3>
            <p className="text-muted-foreground">
              To participate, please submit an extended abstract in Croatian or English. Your abstract should be 1-3 pages formatted 
              according to the template that will be available soon.
            </p>
            <p className="text-muted-foreground mt-2">
              All submissions undergo double-blind review by two reviewers, evaluating topic relevance, scientific contribution, 
              and research methodology. All accepted abstracts will be published in the Book of Abstracts.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Working languages:</strong> Croatian and English
            </p>
          </div>

          <p className="text-center font-semibold text-foreground text-lg pt-4">
            Join us at the Faculty of Philosophy, University of Rijeka on November 6-7, 2025!
          </p>
          
          <div className="text-center pt-2">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 duration-300 ease-out">
              <Link href="#"> 
                Submit Abstract
                <Newspaper className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
