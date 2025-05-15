import {create} from 'zustand';
import { Song } from '@/app/models/Song';

interface PlayerState {
  curSongIndex: number;
  songs: Song[];
  addSong: (song: Song) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  curSongIndex: 0,
  songs: [],
  addSong: (song: Song) => set((state) => ({ songs: [...state.songs, song] }))
}));

export default usePlayerStore;