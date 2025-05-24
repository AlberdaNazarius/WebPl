import { create } from 'zustand';
import { Song } from '@/app/models/Song';
import { Playlist } from '@/app/models/Playlist';
import { AudioService } from '@/app/services/audio.service';

interface PlayerState {
  selectedSong: Song | null;
  curPlaylistId: number;
  curSongId: number;
  playlists: Playlist[];

  setSelectedSong: (url: Song | null) => void;
  setCurSongId: (id: number) => void;
  setCurPlaylistId: (id: number) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  getCurrentPlaylist: () => Playlist | undefined;
  getCurSong: () => Song | undefined;
  nextSong: () => void;
  prevSong: () => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  selectedSong: null,
  curPlaylistId: -1,
  curSongId: -1,
  playlists: [],
  getCurSong: (): Song | undefined => {
    const state = usePlayerStore.getState();

    if (state.selectedSong && state?.selectedSong?.songKey !== '') {
      return state.selectedSong;
    }

    const playlist = state.getCurrentPlaylist();
    const currentPlaylistSongs = playlist?.songs;

    if (!currentPlaylistSongs || currentPlaylistSongs.length === 0) {
      return undefined;
    }
    const currentSong = currentPlaylistSongs.find(p => p.id === state.curSongId);

    if (!currentSong) {
      return undefined;
    }

    return {
      ...currentSong,
      songKey: AudioService.getStreamUrl(currentSong?.songKey),
    };
  },
  getCurrentPlaylist: () => {
    const state = get();
    return state.playlists.find(p => p.id === state.curPlaylistId);
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setSelectedSong: (song: Song | null) =>  set(() => {
    const state = get();
    if (!song) {
      return { selectedSong: null };
    }

    state.setCurPlaylistId(-1);
    state.setCurSongId(-1);
    const modSong = {
      ...song,
      songKey: AudioService.getStreamUrl(song.songKey),
    };
    return { selectedSong: modSong }
  }),
  setPlaylists: (playlists: Playlist[]) => set(() => ({ playlists })),
  setCurSongId: (id: number) => set(() => ({
    curSongId: id,
    selectedSong: null
  })),
  setCurPlaylistId: (id: number) => set(() => ({ curPlaylistId: id })),
  nextSong: () => set((state) => {
    const playlist = state.getCurrentPlaylist();
    if (!playlist || state.curSongId === -1) {
      return { curSongId: -1 };
    }

    const sortedSongs = playlist.songs.slice().sort((a, b) => a.id - b.id);
    const currentIndex = sortedSongs.findIndex(s => s.id === state.curSongId);
    const nextIndex = (currentIndex + 1) % playlist.songs.length;
    return { curSongId: sortedSongs[nextIndex].id };
  }),
  prevSong: () => set((state) => {
    const playlist = state.getCurrentPlaylist();
    if (!playlist || state.curSongId === null) {
      return { curSongId: -1 };
    }

    const sortedSongs = playlist.songs.slice().sort((a, b) => a.id - b.id);
    const currentIndex = sortedSongs.findIndex(s => s.id === state.curSongId);
    const prevIndex = (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
    return { curSongId: sortedSongs[prevIndex].id };
  }),
}));

export default usePlayerStore;