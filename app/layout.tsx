'use client'
import { useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { LanguageProvider } from './contexts/LanguageContext';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

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
      <body className="bg-background text-foreground">
        <LanguageProvider>
          <ClerkProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                  <div className="flex h-screen">
                    <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <Header toggleSidebar={toggleSidebar} />
                      <main className="flex-1 overflow-y-auto p-2 md:p-8 pb-16 md:pb-2"> 
                        {children}
                      </main>
                    </div>
                  </div>
                </ThemeProvider>
              </PersistGate>
            </Provider>
          </ClerkProvider>
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}