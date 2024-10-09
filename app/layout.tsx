'use client'
import { useState } from "react";
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { LanguageProvider } from './contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LanguageProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </LanguageProvider>
          </PersistGate>
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}