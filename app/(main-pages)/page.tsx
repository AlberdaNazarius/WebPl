import PlaylistCard from '@/app/components/playlist/playlist-card/PlaylistCard';
import { PLAYLISTS } from '@/app/helpers/data';

export default function Home() {
  return (
    <div className='main-container pt-5 pl-5 p'>
      <h1 className='text-3xl font-bold text-white'>My Playlists</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
        {PLAYLISTS.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
