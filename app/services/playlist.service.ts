import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiService from '@/app/services/api.service';

const getAllPlaylists = async () => {
  return (await ApiService.makeApiRequest({
    url: '/api/playlist/playlists',
    method: HttpMethods.GET,
  })).data;
}

const getAllUserPlaylists = async () => {
  const response = await ApiService.makeAuthenticatedApiRequest({
    url: '/api/playlist/playlists/user',
    method: HttpMethods.GET,
  });
  if (!response) {
    return [];
  }
  return response.data;
}

const getPlaylist = async (playlistId: number) => {
  return (await ApiService.makeApiRequest({
    url: `/api/playlist/${playlistId}`,
    method: HttpMethods.GET,
  })).data;
}

export const PlaylistService = {
  getAllPlaylists,
  getAllUserPlaylists,
  getPlaylist,
}