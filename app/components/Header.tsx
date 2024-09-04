'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        switch(path) {
            case '/dashboard':
                return 'Dashboard';
            case '/allocations':
                return 'Allocations';
            default:
                return 'Expensify';
        }
    };

    const pageTitle = getPageTitle(pathname);

    return (
        <header className="bg-white shadow-sm h-16">
            <div className="mx-auto px-4 sm:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <button
                            className="mr-4 md:hidden"
                            onClick={toggleSidebar}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl leading-none font-semibold">{pageTitle}</h1>
                    </div>
                    <div>
                        <SignedIn>
                            <UserButton appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }} />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
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