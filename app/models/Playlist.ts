import { Song } from '@/app/models/Song';
import { Scope } from '@/app/enum/Scope';

export interface Playlist {
  id: number,
  name: string,
  imageKey: string,
  songs: Song[],
  scope: Scope,
  metadata: string
}