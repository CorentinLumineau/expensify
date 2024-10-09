'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Menu } from "lucide-react"
import { usePathname } from 'next/navigation'
import { LanguageToggle } from "./LanguageToggle"
import { ThemeToggle } from "./ThemeToggle"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Language, translations } from "@/app/translations"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    toggleSidebar: () => void;
    onSignOut: () => Promise<void>;
}

export default function Header({ toggleSidebar, onSignOut }: HeaderProps) {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = translations[language as Language].sidebar;
    const tcommon = translations[language as Language].common;
    const router = useRouter()
    const supabase = createClientComponentClient()

    const getPageTitle = (path: string) => {
        switch (path) {
            case '/dashboard':
                return t.dashboard;
            case '/asset-allocation':
                return t.assetAllocation;
            case '/compound-interest':
                return t.compoundInterest;
            case '/debt-ratio':
                return t.debtRatio;
            default:
                return 'Expensify';
        }
    };

    const pageTitle = getPageTitle(pathname);

    // Replace the local handleSignOut function with the prop
    const handleSignOut = onSignOut;

    return (
        <header className="shadow-sm h-16 sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center">
                        <button
                            className="mr-4 md:hidden"
                            onClick={toggleSidebar}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl leading-none font-semibold dark:text-white">{pageTitle}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <LanguageToggle />
                        {pathname !== '/sign-in' && pathname !== '/sign-up' && (
                            <Button
                                variant="outline"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        )}
                        {(pathname === '/sign-in' || pathname === '/sign-up') && (
                            <Link href={pathname === '/sign-in' ? '/sign-up' : '/sign-in'}>
                                <Button variant="outline">
                                    {pathname === '/sign-in' ? 'Sign Up' : 'Sign In'}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}