'use client'
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
      <ClerkProvider>
        <body>
          <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header toggleSidebar={toggleSidebar} />
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}