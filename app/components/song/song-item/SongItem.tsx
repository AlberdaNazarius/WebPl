import React from 'react';
import styles from './SongItem.module.scss';
import { Song } from '@/app/models/Song';

interface SongProps {
  index: number;
  song: Song;
}

const SongItem: React.FC<SongProps> = ({song, index}) => {
  return (
    <tr key={song.id} className={`${styles.songItem}`}>
      <th scope="row">{index + 1}</th>
      <td>{song.name}</td>
      <td>{song.album}</td>
      <td>{song.dateAdded}</td>
      <td>{song.duration}</td>
    </tr>
  )
}

export default SongItem;