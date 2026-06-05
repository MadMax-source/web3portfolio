import type { Metadata, Viewport } from 'next';
import { Inter, Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio — Software & Web3 Marketer',
  description:
    "I build high-impact marketing strategies for software products and Web3 ecosystems. Let's grow together.",
  keywords: [
    'web3 marketing',
    'software marketing',
    'blockchain',
    'DeFi',
    'crypto growth',
    'portfolio',
  ],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio — Software & Web3 Marketer',
    description: 'High-impact marketing for software & Web3 ecosystems.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0f1e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
