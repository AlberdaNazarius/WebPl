import {create} from 'zustand';
import { Song } from '@/app/models/Song';

interface PlayerState {
  curSongIndex: number;
  songs: Song[];
  addSong: (song: Song) => void;
  setSongs: (songs: Song[]) => void;
  getCurSong: () => Song | undefined;
  setCurSongIndex: (index: number) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  curSongIndex: 0,
  songs: [],
  addSong: (song: Song) => set((state) => ({ songs: [...state.songs, song] })),
  setSongs: (songs: Song[]) => set(() => ({ songs: songs}  )),
  getCurSong: (): Song | undefined => {
    const state = usePlayerStore.getState();
    if (state.songs.length === 0) {
      return undefined;
    }
    return state.songs[state.curSongIndex];
  },
  setCurSongIndex: (index: number) => set(() => ({ curSongIndex: index}  )),
}));

export default usePlayerStore;