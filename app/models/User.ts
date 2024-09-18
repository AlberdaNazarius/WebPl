import { Playlist } from '@/app/models/Playlist';

export interface User {
  id: number,
  nickname: string,
  imageKey: string,
  playlist: Playlist[]
}