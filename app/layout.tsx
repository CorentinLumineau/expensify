import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, PieChartIcon } from "lucide-react";
import Header from "@/app/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Allocations", href: "/allocations", icon: PieChartIcon },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <div className="flex min-h-screen">
            <nav className="w-64 bg-gray-100 min-h-screen p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}><a href={item.href} className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </a></li>
                ))}
              </ul>
              <div className="flex items-center space-x-4">
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
              </div>
            </nav>
            <div className="flex-1">
              <main className="flex-grow">
                <Header />
                {children}
              </main>
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}