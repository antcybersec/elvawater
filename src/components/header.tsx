'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './logo';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/inquiry', label: 'Bulk Inquiry' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const NavLink = ({ href, label, onLinkClick }: { href: string, label: string, onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary font-bold" : "text-muted-foreground"
      )}
      onClick={onLinkClick}
    >
      {label}
    </Link>
  );
};


export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                     <X className="h-6 w-6" />
                     <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} onLinkClick={() => setIsSheetOpen(false)} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
