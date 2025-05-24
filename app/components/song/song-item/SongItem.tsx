'use client';
import React, { useEffect, useState } from 'react';
import styles from './SongItem.module.scss';
import { Song } from '@/app/models/Song';
import usePlayerStore from '@/app/store/PlayerStore';
import { formatDate } from '@/app/helpers/utils';

interface SongProps {
  index: number;
  playlistId: number;
  song: Song;
}

const SongItem: React.FC<SongProps> = ({song, index, playlistId}) => {
  const {curPlaylistId, curSongId, setCurSongId, setCurPlaylistId} = usePlayerStore();
  const [isActive, setIsActive] = useState(false);

  const handleSongClick = () => {
    setCurPlaylistId(playlistId)
    setCurSongId(index);
  }

  useEffect(() => {
    if (curPlaylistId === playlistId && curSongId === index) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [curPlaylistId, curSongId]);

  return (
    <tr
      key={song.id}
      className={`${styles.songItem} ${isActive ? styles.active : ''}`}
      onDoubleClick={handleSongClick}
    >
      <th scope="row">{index + 1}</th>
      <td>{song?.name}</td>
      <td>{song?.album}</td>
      <td>{formatDate(song?.addedDate)}</td>
      <td>{song?.duration}</td>
    </tr>
  )
}

export default SongItem;