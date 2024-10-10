'use client'

import { User, LogOut, Sun, Moon, Monitor, Check, Settings } from "lucide-react"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { useTheme } from "@/app/contexts/ThemeContext"
import { Language, translations } from "@/app/translations"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileDropdownProps {
    onSignOut?: () => Promise<void>;
    isAuthenticated?: boolean;
}

export function ProfileDropdown({ onSignOut, isAuthenticated = true }: ProfileDropdownProps) {
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const tcommon = translations[language as Language].common;

    const languageOptions = [
        { value: 'en', label: 'English', flag: '/images/gb-flag.svg' },
        { value: 'fr', label: 'Français', flag: '/images/fr-flag.svg' },
    ];

    const themeOptions = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {isAuthenticated ? (
                        <User className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                        <Settings className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span className="sr-only">Open settings menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated && <DropdownMenuLabel>{tcommon.myAccount}</DropdownMenuLabel>}
                {isAuthenticated && <DropdownMenuSeparator />}
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                {languageOptions.map((option) => (
                    <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setLanguage(option.value as Language)}
                        className={language === option.value ? 'bg-accent' : ''}
                    >
                        <div className="flex items-center w-full p-1">
                            <Image
                                src={option.flag}
                                alt={`${option.label} flag`}
                                width={24}
                                height={18}
                                className="mr-2"
                            />
                            <span>{option.label}</span>
                            {language === option.value && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                {themeOptions.map((option) => (
                    <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                        className={theme === option.value ? 'bg-accent' : ''}
                    >
                        <div className="flex items-center w-full p-1">
                            <option.icon className="mr-2 h-4 w-4" />
                            <span>{option.label}</span>
                            {theme === option.value && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </div>
                    </DropdownMenuItem>
                ))}
                {isAuthenticated && onSignOut && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={onSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}