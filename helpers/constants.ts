import { Playlist } from '@/app/models/Playlist';
import { Song } from '@/app/models/Song';
import { Scope } from '@/app/enum/Scope';

export const PLAYLIST: Playlist = {
  id: 1,
  name: 'ToHome',
  image: '/images/Image.jpg',
  songs: [],
  scope: Scope.PRIVATE,
  metadata: 'Author | 32 songs',
};

export const SONGS: Song[] = [
  {
    id: 1,
    name: 'Chris',
    author: 'HTML tables',
    album: '22',
    dateAdded: '22',
    duration: '22',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
  {
    id: 2,
    name: 'Dennis',
    author: 'HTML tables',
    album: '22',
    dateAdded: '22',
    duration: '22',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
  {
    id: 3,
    name: 'Sarah',
    author: 'HTML tables',
    album: '22',
    dateAdded: '22',
    duration: '22',
    songKey: 'key',
    image: '/images/Image.jpg',
  },
];

export const PLAYLIST_TABLE_HEADERS = [
  '#',
  'Title',
  'Album',
  'Data added',
  'Time',
];

export const SIDEBAR_ITEMS = [
  {
    id: '1',
    name: 'Home',
  },
  {
    id: '2',
    name: 'Playlists',
  },
  {
    id: '3',
    name: 'Albums',
  },
  {
    id: '4',
    name: 'Artists',
  },
];