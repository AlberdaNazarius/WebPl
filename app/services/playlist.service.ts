import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiService from '@/app/services/api.service';

const getAllPlaylists = async () => {
  return (await ApiService.makeApiRequest({
    url: '/api/playlist/playlists',
    method: HttpMethods.GET,
  })).data;
};

const getAllUserPlaylists = async () => {
  const response = await ApiService.makeAuthenticatedApiRequest({
    url: '/api/playlist/playlists/user',
    method: HttpMethods.GET,
  });
  if (!response) {
    return [];
  }
  return response.data;
};

const getPlaylist = async (playlistId: number) => {
  return (await ApiService.makeApiRequest({
    url: `/api/playlist/${playlistId}`,
    method: HttpMethods.GET,
  })).data;
};

const createPlaylist = async (playlistData: { name: string, imageKey?: string }) => {
  await ApiService.makeAuthenticatedApiRequest({
    url: '/api/playlist',
    method: HttpMethods.POST,
    body: playlistData,
  });
};

const addSong = async (playlistId: number, songId: number) => {
  await ApiService.makeAuthenticatedApiRequest({
    url: `/api/playlist/${playlistId}/song/${songId}`,
    method: HttpMethods.POST,
  });
}

const removeSong = async (playlistId: number, songId: number) => {
  await ApiService.makeAuthenticatedApiRequest({
    url: `/api/playlist/${playlistId}/song/${songId}`,
    method: HttpMethods.DELETE,
  });
}

const removePlaylist = async (playlistId: number) => {
  await ApiService.makeAuthenticatedApiRequest({
    url: `/api/playlist/${playlistId}`,
    method: HttpMethods.DELETE,
    headers: {}
  });
}

export const PlaylistService = {
  getAllPlaylists,
  getAllUserPlaylists,
  getPlaylist,
  createPlaylist,

  addSong,
  removeSong,
  removePlaylist
};