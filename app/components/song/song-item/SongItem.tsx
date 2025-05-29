'use client';
import React, { useEffect, useState } from 'react';
import styles from './SongItem.module.scss';
import { Song } from '@/app/models/Song';
import usePlayerStore from '@/app/store/PlayerStore';
import { formatDate } from '@/app/helpers/utils';
import UpdateRightClickModal from '@/app/components/right-click-modal/UpdateRightClickModal';
import { PlaylistService } from '@/app/services/playlist.service';

interface SongProps {
  index: number;
  playlistId: number;
  song: Song;
}

const SongItem: React.FC<SongProps> = ({ song, index, playlistId }) => {
  const { getPlaylists } = usePlayerStore();

  const { curPlaylistId, curSongId, setCurSongId, setCurPlaylistId } = usePlayerStore();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSongClick = (id: number) => {
    setCurPlaylistId(playlistId);
    setCurSongId(id);
  };


  const addToPlaylist = async (playlistId: number, songId: number) => {
    await PlaylistService.addSong(playlistId, songId);
  };

  const removeFromPlaylist = async (playlistId: number, songId: number) => {
    await PlaylistService.removeSong(playlistId, songId);
  };


  useEffect(() => {
    if (curPlaylistId === playlistId && curSongId === song.id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [curPlaylistId, curSongId]);

  return (
    <UpdateRightClickModal
      key={song.id}
      className={`${styles.songItem} ${isActive ? styles.active : ''}`}
      onDoubleClick={() => handleSongClick(song.id)}
      menuContent={(
        <div className="bg-[#4a4f57] shadow-lg rounded-md min-w-24 px-2">
          <ul className="space-y-2 text-center min-w-48 py-2 px-2">
            <li onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}>
              <span className="hover:font-semibold" >add to playlist</span>
              <div className="mt-2 text-start">
                {showPlaylistMenu && getPlaylists().map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="hover:font-semibold"
                    onClick={() => addToPlaylist(playlist.id, song.id)}
                  >
                    {index+1}) {playlist.name}
                  </div>
                ))}
              </div>
            </li>
            {!showPlaylistMenu &&
              <li
                className="hover:font-semibold"
                onClick={() => removeFromPlaylist(playlistId, song.id)}
              >
                remove from playlist
              </li>
            }
          </ul>
        </div>
      )}>
      <>
        <th scope="row">{index + 1}</th>
        <td>{song?.name}</td>
        <td>{song?.album}</td>
        <td>{formatDate(song?.addedDate)}</td>
        <td>{song?.duration}</td>
      </>
    </UpdateRightClickModal>
  );
};

export default SongItem;