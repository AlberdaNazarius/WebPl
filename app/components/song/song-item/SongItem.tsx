'use client';
import React from 'react';
import styles from './SongItem.module.scss';
import { Song } from '@/app/models/Song';
import usePlayerStore from '@/app/store/PlayerStore';

interface SongProps {
  index: number;
  song: Song;
}

const SongItem: React.FC<SongProps> = ({song, index}) => {

  const {setCurSongIndex} = usePlayerStore();
  const handleSongClick = (index: number) => {
    setCurSongIndex(index);
  }

  return (
    <tr
      key={song.id}
      className={`${styles.songItem}`}
      onDoubleClick={() => handleSongClick(song.id)}
    >
      <th scope="row">{index + 1}</th>
      <td>{song.name}</td>
      <td>{song.album}</td>
      <td>{song.dateAdded}</td>
      <td>{song.duration}</td>
    </tr>
  )
}

export default SongItem;