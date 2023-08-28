import './globals.css';
import type { Metadata } from 'next';

import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Party Cinema',
  description: 'Watch videos with your friends, chat, and hangout online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
