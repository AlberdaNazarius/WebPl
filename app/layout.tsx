'use client';
import localFont from 'next/font/local';
import './globals.scss';
import React, { useEffect } from 'react';
import Header from '@/app/components/common/header/Header';
import { PlaylistService } from '@/app/services/playlist.service';
import usePlayerStore from '@/app/store/PlayerStore';

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

export default function RootLayout(
  {
    children,
  }: Readonly<{ children: React.ReactNode; }>) {

  const {setPlaylists} = usePlayerStore();
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await PlaylistService.getPlaylists();
        setPlaylists(playlists);
      } catch (err) {
        console.error('Failed to fetch playlists:', err);
      }
    };
    fetchPlaylists();
  }, [setPlaylists]);

  return (
    <html lang="en" className="main-background">
    <head>
      <title>Streaming Service</title>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Header />
    {children}
    </body>
    </html>
  );
}
