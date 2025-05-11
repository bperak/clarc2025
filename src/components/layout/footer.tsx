import Image from 'next/image';
import { BrainCircuit, Facebook, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-8 w-8 text-primary mr-2" />
            <p className="text-xl font-semibold">CLARC 2025: Bridging Minds</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">In collaboration with</span>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="CJI - Center for Language Research">
              <Image 
                src="/cji-logo.png" 
                alt="CJI Logo" 
                width={100} // Adjusted for a slightly wider logo if needed, assuming original is square-ish.
                height={40}  // The provided image is 256x256, this maintains aspect ratio.
                className="h-10 w-auto object-contain" // Ensures the logo fits well
                data-ai-hint="CJI logo" 
              />
            </a>
          </div>
        </div>
        <p className="text-sm mb-4 text-muted-foreground">
          Join us for an immersive experience into the future of AI and collaborative research.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="CLARC LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} CLARC Conference. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
