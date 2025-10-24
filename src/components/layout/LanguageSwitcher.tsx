'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the locale in the current path
    const newPath = pathname.replace(/^\/(en|ja)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Button
        variant={currentLocale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLocale('en')}
        className="h-8 px-2"
      >
        EN
      </Button>
      <Button
        variant={currentLocale === 'ja' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLocale('ja')}
        className="h-8 px-2"
      >
        JA
      </Button>
    </div>
  );
}

