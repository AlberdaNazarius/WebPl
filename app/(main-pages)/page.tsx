'use client';
import PlaylistCard from '@/app/components/playlist/playlist-card/PlaylistCard';
import { useEffect, useState } from 'react';
import { PlaylistService } from '@/app/services/playlist.service';
import { Playlist } from '@/app/models/Playlist';

export default function Home() {
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [allUserPlaylists, setAllUserPlaylists] = useState<Playlist[]>([]);


  useEffect(() => {
    if (allPlaylists.length > 0) return;

    const fetchPlaylists = async () => {
      setAllPlaylists(await PlaylistService.getAllPlaylists());
      setAllUserPlaylists(await PlaylistService.getAllUserPlaylists());
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="main-container pt-5 pl-5 p">
      {allUserPlaylists.length > 0 && (
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-white">My Playlists</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
            {allUserPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-white">All Playlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
          {allPlaylists.length > 0 && allPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
