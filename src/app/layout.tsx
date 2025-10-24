import { Geist } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EKOI - AI Server & GPU Infrastructure Solutions',
  description:
    'Enterprise-grade AI GPU servers and cloud infrastructure solutions for machine learning and AI workloads',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
