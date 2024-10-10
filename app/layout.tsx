'use client'
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from './contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
            <LanguageProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}