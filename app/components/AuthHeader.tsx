'use client'

import { LanguageToggle } from "./LanguageToggle"
import { ThemeToggle } from "./ThemeToggle"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Language, translations } from "@/app/translations"
import Image from "next/image";

export default function AuthHeader() {
    const { language } = useLanguage();
    const tcommon = translations[language as Language].common;

    return (
        <header className="shadow-sm h-16 sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                <Image
          src="/icon-512x512.png"
          alt="Expensify"
          width={56}
          height={56}
          priority
          className="z-10"
        />
                    <h1 className="text-2xl leading-none font-semibold dark:text-white">Expensify</h1>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}