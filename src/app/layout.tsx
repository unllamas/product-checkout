import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Llamout - Payment System',
  description: 'By @unllamas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <div className='relative overflow-x-hidden flex flex-col w-screen min-h-screen bg-background'>{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
