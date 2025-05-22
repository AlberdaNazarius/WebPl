import { Playlist } from '@/app/models/Playlist';
import { Scope } from '@/app/enum/Scope';
import { Song } from '@/app/models/Song';

export const SONGS: Song[] = [
  {
    id: 0,
    name: 'COWBELL WARRIOR',
    author: 'tables',
    album: 'Hello',
    dateAdded: '12.02.2022',
    duration: '1:58',
    songKey: '/audio/COWBELL WARRIOR! - SXMPRA.mp3',
    image: '/images/Image.jpg',
  },
  {
    id: 1,
    name: 'Enemy',
    author: 'Image Dragons',
    album: 'A road',
    dateAdded: '14.02.2025',
    duration: '2:51',
    songKey: '/audio/Enemy - from the series Arcane League of Legends - Imagine Dragons.mp3',
    image: '/images/Image.jpg',
  },
  {
    id: 2,
    name: 'Shameless',
    author: 'Good morning',
    album: 'Somewhere',
    dateAdded: '22.02.2022',
    duration: '2:12',
    songKey: '/audio/Shameless - Camila Cabello.mp3.mp3',
    image: '/images/Image.jpg',
  },
];

export const PLAYLISTS: Playlist[] = [
  {
    id: 0,
    name: 'ToHome',
    image: '/images/playlists/image-asset.png',
    songs: [SONGS[0], SONGS[1]],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  },
  {
    id: 1,
    name: 'ToWork',
    image: '/images/playlists/istock-1357759108.jpg',
    songs: [SONGS[2]],
    scope: Scope.PUBLIC,
    metadata: 'Author | 3 songs',
  },
  {
    id: 2,
    name: 'ToGym',
    image: '/images/playlists/Logo.jpg',
    songs: [SONGS[1]],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  },
  {
    id: 3,
    name: 'ToHome',
    image: '/images/Image.jpg',
    songs: [SONGS[1]],
    scope: Scope.PRIVATE,
    metadata: 'Author | 3 songs',
  }
];