import { Playlist } from '@/app/models/Playlist';
import { Song } from '@/app/models/Song';
import { Scope } from '@/app/enum/Scope';

export const IMAGE_SIZE_X: number = 200;
export const IMAGE_SIZE_Y: number = 160;

export const PLAYLISTS: Playlist[] = [
  {
    id: 0,
    name: 'ToHome',
    image: '/images/playlists/image-asset.png',
    songs: [],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  },
  {
    id: 1,
    name: 'ToWork',
    image: '/images/playlists/istock-1357759108.jpg',
    songs: [],
    scope: Scope.PUBLIC,
    metadata: 'Author | 3 songs',
  },
  {
    id: 2,
    name: 'ToGym',
    image: '/images/playlists/Logo.jpg',
    songs: [],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  },
  {
    id: 3,
    name: 'ToHome',
    image: '/images/Image.jpg',
    songs: [],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  }
];

export const SONGS: Song[] = [
  {
    id: 0,
    name: 'Chris',
    author: 'tables',
    album: 'Hello',
    dateAdded: '12.02.2022',
    duration: '1:58',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
  {
    id: 1,
    name: 'Dennis',
    author: 'Noname',
    album: 'A road',
    dateAdded: '14.02.2025',
    duration: '2:51',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
  {
    id: 2,
    name: 'Sarah',
    author: 'Good morning',
    album: 'Somewhere',
    dateAdded: '22.02.2022',
    duration: '2:12',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
];

export const SIDEBAR_TITLE: string = 'Playlists';
export const PLAYLIST_TABLE_HEADERS = [
  '#',
  'Title',
  'Album',
  'Data added',
  'Time',
];