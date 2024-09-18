import { Song } from '@/app/models/Song';

export interface Playlist {
  id: number,
  image: string,
  songs: Song[],
  metadata: string
}