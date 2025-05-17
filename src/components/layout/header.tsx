
"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, BrainCircuit, User, LogOut, LogIn } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';


export function Header() {
  const { t } = useTranslation();
  const { user, signOutUser, loading } = useAuth();
  const router = useRouter();

  const navItems = [
    { href: '#hero', labelKey: 'nav.home' },
    { href: '#schedule', labelKey: 'nav.schedule' },
    { href: '#speakers', labelKey: 'nav.speakers' },
    { href: '#ai-assistant', labelKey: 'nav.aiAssistant' },
    { href: '#call-for-papers', labelKey: 'nav.callForPapers' },
    // { href: '#registration', labelKey: 'nav.register' }, // Registration can be prominent
    { href: '#sponsors', labelKey: 'nav.sponsors' },
    { href: '#venue', labelKey: 'nav.venue' },
    { href: '#accommodations', labelKey: 'nav.accommodations' },
    { href: '#about-opatija', labelKey: 'nav.aboutOpatija' },
  ];

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/'); // Redirect to home after sign out
    } catch (error) {
      console.error("Sign out error", error);
      // Optionally show a toast message for sign out error
    }
  };
  
  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 pl-5 flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            CLARC 2025
          </span>
        </Link>
        <nav className="hidden lg:flex flex-1 items-center space-x-4 xl:space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <LanguageSwitcher />
          {!user && !loading && (
             <Button asChild className="hidden md:inline-flex">
                <Link href="#registration">{t('nav.registerNowButton')}</Link>
             </Button>
          )}

          {loading ? (
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user.photoURL || ""} alt={user.displayName || user.email || "User"} /> */}
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{t('auth.loggedInAs')}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  {t('auth.profileLink')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {t('auth.settingsLink')}
                </DropdownMenuItem> 
                <DropdownMenuSeparator /> 
                */}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('auth.logoutButton')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth">
                <LogIn className="mr-0 md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">{t('auth.loginButtonNav')}</span>
              </Link>
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('nav.toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
               <SheetClose asChild>
                <Link href="/" className="flex items-center space-x-2 mb-8">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <span className="font-bold">CLARC 2025</span>
                </Link>
               </SheetClose>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.labelKey}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </SheetClose>
                ))}
                <hr className="my-2"/>
                 {!user && (
                    <SheetClose asChild>
                        <Link href="#registration" className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90">
                            {t('nav.registerNowButton')}
                        </Link>
                    </SheetClose>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
