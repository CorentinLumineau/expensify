'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Language, translations } from "@/app/translations";

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = translations[language as Language].sidebar;
    const tcommon = translations[language as Language].common;

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
                        <ThemeToggle />
                        <LanguageToggle />
                        <SignedIn>
                            <UserButton appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }} />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    {tcommon.signIn}
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    );
}