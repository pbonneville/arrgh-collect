import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@/theme/ThemeProvider';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import appConfig from "../../config.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${appConfig.app.displayName} - GitHub-Backed Documentation`,
  description: appConfig.app.description,
  keywords: appConfig.app.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Material UI Color Scheme Script - must be before any content */}
        <InitColorSchemeScript attribute="data" />
        
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
