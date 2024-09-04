import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

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
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen">
                    <ClerkProvider>
                        <Header />
                        <main className="flex-grow">
                            {children}
                        </main>
                        {/* <Footer /> */}
                    </ClerkProvider>
                </div>
            </body>
        </html>
    );
}