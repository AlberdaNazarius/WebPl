import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';

const getAllSongs = async () => {
  return (await ApiService.makeApiRequest({
    url: '/api/song/songs',
    method: HttpMethods.GET
  })).data;
}

export const SongService = {
  getAllSongs
}