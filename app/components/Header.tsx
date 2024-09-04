import Link from 'next/link';
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { InvestmentLogo } from '@/app/components/InvestmentLogo';

export default function Header() {
    return (
        <header className="bg-background shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <InvestmentLogo className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">Expensify</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </nav>
            </div>
        </header>
    );
}