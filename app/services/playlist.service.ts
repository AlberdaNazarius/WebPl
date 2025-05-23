import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiService from '@/app/services/api.service';

const getPlaylists = async () => {
  return (await ApiService.makeApiRequest({
    url: '/api/playlist/playlists',
    method: HttpMethods.GET,
  })).data;
}

export const PlaylistService = {
  getPlaylists,
}