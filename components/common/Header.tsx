'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        switch (path) {
            case '/dashboard':
                return 'Dashboard';
            case '/allocations':
                return 'Allocations';
            case '/compound-interest':
                return 'Compound Interest Calculator';
            case '/debt-ratio':
                return 'Debt Ratio Calculator';
            default:
                return 'Expensify';
        }
    };

    const pageTitle = getPageTitle(pathname);

    return (
        <header className="shadow-sm h-16">
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
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    );
}