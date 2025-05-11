import { BrainCircuit, Facebook, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <BrainCircuit className="h-8 w-8 text-primary mr-2" />
          <p className="text-xl font-semibold">CLARC 2025: Bridging Minds</p>
        </div>
        <p className="text-sm mb-4">
          Join us for an immersive experience into the future of AI and collaborative research.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
