import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Train, Car, MapPin } from 'lucide-react';

export function AboutOpatijaSection() {
  return (
    <div className="relative text-primary-foreground py-20 md:py-32 overflow-hidden">
      {/* Background Image with Animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/opatija/1920/1080"
          alt="Scenic view of Opatija, Croatia with its coastline and historic buildings"
          layout="fill"
          objectFit="cover"
          className="opatija-bg-animate"
          data-ai-hint="Opatija Croatia"
          priority // Preload this large image
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div> {/* Gradient overlay for better text readability */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <MapPin className="mx-auto h-12 w-12 mb-4 text-accent" />
          <h2 className="text-4xl font-bold tracking-tight mb-4">Discover Opatija, Croatia</h2>
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/90">
            The Pearl of the Adriatic, a historic seaside resort renowned for its stunning Austro-Hungarian architecture, lush parks, and beautiful coastal promenades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-background/80 dark:bg-card/70 backdrop-blur-md text-foreground shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Plane className="mr-3 h-6 w-6 text-primary" /> How to Arrive</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>By Air:</strong> The nearest international airport is Rijeka Airport (RJK) on the island of Krk, approximately 40 km (25 miles) away. Other options include Pula Airport (PUY) at 100 km (62 miles) and Zagreb Airport (ZAG) at 180 km (112 miles), offering more international connections.</p>
              <p><strong>By Train:</strong> Opatija-Matulji train station (5 km from center) is the main rail hub. From there, taxis or local buses provide easy access to Opatija. Rijeka's larger train station (15 km away) offers more connections.</p>
              <p><strong>By Car:</strong> Opatija is well-connected by Croatia's modern highway network. Follow signs for Rijeka, then Opatija. Main routes include the A7 (Rupa-Rijeka) and A6/A1 from Zagreb or Split.</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 dark:bg-card/70 backdrop-blur-md text-foreground shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl">Things to Experience</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc list-inside space-y-2">
                <li>Stroll along the <strong>Lungomare</strong>, a picturesque 12km coastal promenade connecting Opatija with nearby towns.</li>
                <li>Visit <strong>Villa Angiolina</strong>, home to the Croatian Museum of Tourism, set within a beautiful park.</li>
                <li>Relax in <strong>Park Sv. Jakova (St. James's Park)</strong> or <strong>Margarita Park</strong>, admiring exotic plants.</li>
                <li>Admire the iconic "Maiden with the Seagull" statue, a symbol of Opatija.</li>
                <li>Explore the charming streets, historic villas, and enjoy the local Mediterranean cuisine and vibrant café culture.</li>
                <li>Discover nearby Učka Nature Park for hiking and panoramic views.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
