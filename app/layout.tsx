'use client'
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Head from 'next/head';
import { ThemeProvider } from './contexts/ThemeContext';
import { InstallPrompt } from "./components/InstallPrompt";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Expensify" />
      </Head>
      <ClerkProvider>
        <ThemeProvider>
          <body className="dark:bg-gray-900 dark:text-white">
            <InstallPrompt />
            <div className="flex h-screen">
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-8">
                  {children}
                </main>
              </div>
            </div>
          </body>
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}