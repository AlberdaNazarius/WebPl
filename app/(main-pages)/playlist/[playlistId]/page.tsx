'use client';
import Image from 'next/image';
import { PLAYLIST_TABLE_HEADERS } from '@/app/helpers/constants';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Playlist } from '@/app/models/Playlist';
import SongItem from '@/app/components/song/song-item/SongItem';
import { PLAYLISTS } from '@/app/helpers/data';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<Playlist>();

  useEffect(() => {
    if (!playlistId) {
      return;
    }

    if (typeof playlistId === 'string') {
      const id = parseInt(playlistId);
      setPlaylist(PLAYLISTS[id]);
    } else {
      setPlaylist(PLAYLISTS[parseInt(playlistId[0])]);
    }
  }, [playlistId]);

  return (
    <div className="flex justify-center pl-4 main-container">
      <div className="container mt-6 mb-4">
        {/*TODO find better solution later*/}
        {playlist && (
          <div className="flex flex-row mb-4 relative">
            <Image
              className={'rounded-lg w-[232px] h-[174px]'}
              width={232}
              height={174}
              src={playlist?.image}
              alt="playlist_image" />
            <div className="card-body">
              <span className="my-0 text-sm">{playlist?.scope}</span>
              <h1 className="font-bold text-7xl">{playlist?.name}</h1>
              <span className="absolute bottom-0">{playlist?.metadata}</span>
            </div>
          </div>
        )}
        <hr />
        <div className="w-full mt-3">
          <table className="w-[100%] border-separate border-spacing-y-3">
            <thead>
            <tr>
              {PLAYLIST_TABLE_HEADERS.map((header) => (
                <th key={header} scope="col">{header}</th>
              ))}
            </tr>
            </thead>
            <tbody className="text-center">
            {playlist?.songs?.map((song, index) => (
              <SongItem key={song.id} playlistId={playlist?.id} song={song} index={index} />
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}