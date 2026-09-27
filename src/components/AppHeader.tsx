'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Church, List, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Topics', icon: List },
  { href: '/favorites', label: 'Favorites', icon: Heart },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-primary/10 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline font-semibold text-primary hover:opacity-80 transition-opacity">
          <Church className="w-7 h-7" />
          <span>Sanctuary Now</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-primary/20",
                pathname === item.href ? "text-primary bg-primary/10 font-semibold" : "text-foreground/70 hover:text-primary"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
