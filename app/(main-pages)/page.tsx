'use client';
import PlaylistCard from '@/app/components/playlist/playlist-card/PlaylistCard';
import usePlaylistsStore from '@/app/store/PlaylistsStore';
import usePlayerStore from '@/app/store/PlayerStore';

export default function Home() {
  const {userPlaylists} = usePlaylistsStore();
  const {playlists} = usePlayerStore();

  return (
    <div className="main-container pt-5 pl-5 p">
      {userPlaylists.length > 0 && (
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-white">My Playlists</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
            {userPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-white">All Playlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
          {playlists.length > 0 && playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
