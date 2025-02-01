import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/theme-provider';

import { siteConfig } from '@/config/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['nextjs', 'react', 'payment', 'checkout', 'lightning network', 'bitcoin'],
  authors: [
    {
      name: 'unllamas',
      url: 'https://www.jonallamas.com',
    },
  ],
  creator: 'unllamas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@unllamas',
  },
  icons: {
    icon: '/icon.png',
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} disableTransitionOnChange>
          <div className='relative overflow-x-hidden flex flex-col w-screen min-h-screen bg-background'>{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
