'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Menu } from "lucide-react"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Language, translations } from "@/app/translations"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProfileDropdown } from "./ProfileDropdown"

interface HeaderProps {
    toggleSidebar: () => void;
    onSignOut: () => Promise<void>;
}

export default function Header({ toggleSidebar, onSignOut }: HeaderProps) {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = translations[language as Language].sidebar;

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
                        {pathname !== '/sign-in' && pathname !== '/sign-up' && (
                            <ProfileDropdown onSignOut={onSignOut} />
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