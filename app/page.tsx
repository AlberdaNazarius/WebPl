import PlaylistCard from '@/components/playlist/playlist-card/PlaylistCard';
import { PLAYLISTS } from '@/helpers/constants';

export default function Home() {
  return (
    <div className='main-container'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
        {PLAYLISTS.map((playlist) => (
          <PlaylistCard playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
