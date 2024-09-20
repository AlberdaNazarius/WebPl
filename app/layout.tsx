import localFont from 'next/font/local';
import './globals.scss';
import React from 'react';
import Header from '@/components/common/header/Header';
import Sidebar from '@/components/common/sidebar/Sidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='main-background'>
    <body
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Header />
    <Sidebar />
    <main className="global-padding main-style">
      {children}
    </main>
    </body>
    </html>
  );
}
