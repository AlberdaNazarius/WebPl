'use client';
import PlaylistCard from '@/app/components/playlist/playlist-card/PlaylistCard';
import { useEffect, useState } from 'react';
import { PlaylistService } from '@/app/services/playlist.service';
import { Playlist } from '@/app/models/Playlist';

export default function Home() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (playlists.length > 0) return;

    const fetchPlaylists = async () => {
      setPlaylists(await PlaylistService.getPlaylists());
    };

    fetchPlaylists();
  }, []);

  return (
    <div className='main-container pt-5 pl-5 p'>
      <h1 className='text-3xl font-bold text-white'>My Playlists</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
        {playlists.length>0 && playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
