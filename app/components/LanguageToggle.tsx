'use client'

import { useLanguage } from '@/app/contexts/LanguageContext'
import Image from 'next/image'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <Image
        src={`/images/${language === 'en' ? 'fr' : 'gb'}-flag.svg`}
        alt={language === 'en' ? 'French flag' : 'British flag'}
        width={24}
        height={18}
      />
    </button>
  );
}