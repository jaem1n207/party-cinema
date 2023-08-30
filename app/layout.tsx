import type { Metadata } from 'next';

import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Open_Sans } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Party Cinema',
  description: 'Watch videos with your friends, chat, and hangout online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(openSans.className, 'bg-white dark:bg-[#303338]')}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
