'use client';
import React, { useEffect } from 'react';
import Sidebar from '@/app/components/common/sidebar/Sidebar';
import WebPlayer from '@/app/components/web-player/WebPlayer';
import usePlayerStore from '@/app/store/PlayerStore';
import usePlaylistsStore from '@/app/store/PlaylistsStore';
import { PlaylistService } from '@/app/services/playlist.service';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {setPlaylists} = usePlayerStore();
  const {setUserPlaylists} = usePlaylistsStore();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await PlaylistService.getAllPlaylists();
        const userPlaylists = await PlaylistService.getAllUserPlaylists();

        setPlaylists(playlists);
        setUserPlaylists(userPlaylists);
      } catch (err) {
        console.error('Failed to fetch playlists:', err);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <main className='main-style global-padding'>
      <Sidebar />
      {children}
      <WebPlayer />
    </main>
  );
};

export default Layout;