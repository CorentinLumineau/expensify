'use client'

import { useLanguage } from '@/app/contexts/LanguageContext'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'en' : 'fr');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <Image
        src={`/images/${language === 'en' ? 'fr' : 'gb'}-flag.svg`}
        alt={language === 'en' ? 'French flag' : 'British flag'}
        width={24}
        height={18}
      />
    </Button>
  );
}