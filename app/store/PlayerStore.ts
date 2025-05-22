import {create} from 'zustand';
import { Song } from '@/app/models/Song';
import { Playlist } from '@/app/models/Playlist';
import { PLAYLISTS } from '@/app/helpers/data';

interface PlayerState {
  curPlaylistId: number;
  curSongId: number;
  setCurSongId: (index: number) => void;
  setCurPlaylistId: (index: number) => void;

  playlists: Playlist[];
  getCurSong: () => Song | undefined;
  nextSong: () => void;
  prevSong: () => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  curPlaylistId: 0,
  curSongId: 0,
  playlists: PLAYLISTS,
  getCurSong: (): Song | undefined => {
    const state = usePlayerStore.getState();
    const curPlaylistSongs = state.playlists?.[state.curPlaylistId]?.songs
    if (!curPlaylistSongs || curPlaylistSongs.length === 0) {
      return undefined;
    }
    return curPlaylistSongs[state.curSongId];
  },
  setCurSongId: (index: number) => set(() => ({ curSongId: index}  )),
  setCurPlaylistId: (index: number) => set(() => ({ curPlaylistId: index})),
  nextSong: () => set((state) => {
    const nextIndex = (state.curSongId + 1) % state.playlists?.[state.curPlaylistId]?.songs?.length;
    return { curSongId: nextIndex };
  }),
  prevSong: () => set((state) => {
    const prevIndex = (state.curSongId - 1 + state.playlists?.[state.curPlaylistId]?.songs.length) % state.playlists?.[state.curPlaylistId]?.songs.length;
    return { curSongId: prevIndex };
  }),
}));

export default usePlayerStore;