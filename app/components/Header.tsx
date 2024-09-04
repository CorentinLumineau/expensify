import Link from 'next/link';
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";

export default function Header() {
    return (
        <header className="bg-background shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-foreground">Bite</span>
                </Link>
                
            </div>
        </header>
    );
}