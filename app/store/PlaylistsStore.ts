import { create } from 'zustand';
import { Playlist } from '@/app/models/Playlist';

interface PlaylistsState {
  userPlaylists: Playlist[];

  getUserPlaylists: () => Playlist[];
  setUserPlaylists: (playlists: Playlist[]) => void;
  clearUserPlaylists: () => void;
}

const usePlaylistsStore = create<PlaylistsState>((set, get) => ({
  userPlaylists: [],
  getUserPlaylists: () => {
    const state = get();
    return state.userPlaylists;
  },
  setUserPlaylists: (playlists: Playlist[]) => set(() => ({
    userPlaylists: playlists,
  })),
  clearUserPlaylists: () => set(() => ({
    userPlaylists: [],
  }))
}));

export default usePlaylistsStore;