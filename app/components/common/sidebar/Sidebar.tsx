'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { SIDEBAR_TITLE } from '@/app/helpers/constants';
import { Routes } from '@/app/helpers/routes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Playlist } from '@/app/models/Playlist';
import { PlaylistService } from '@/app/services/playlist.service';

export default function Sidebar() {
  const { playlistId } = useParams();
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (playlists.length > 0) return;

    const fetchPlaylists = async () => {
      setPlaylists(await PlaylistService.getPlaylists());
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (!playlistId) {
      setSelectedPlaylist(-1);
      return;
    }

    const id = parseInt(playlistId as string, 10);
    setSelectedPlaylist(id);
  }, [playlistId]);

  return (
    <aside className={clsx(styles.aside, 'w-[225px] pl-3 pr-1 pt-3 fixed left-1.5 bottom-[106px] top-[3.75rem] rounded-lg')}>
      <h5 className="text-lg text-white">
        {SIDEBAR_TITLE}
      </h5>
      <ul className={`mt-2 pl-2 cursor-pointer ${styles.nav}`}>
        {playlists.length > 0 && playlists.map((item) => (
          <li
            key={item.id}
            className={clsx(
              selectedPlaylist === item.id ? 'font-bold text-white' : '',
              'w-full overflow-hidden mb-1'
            )}
          >
            <Link className='block w-full text-ellipsis overflow-hidden whitespace-nowrap' href={`${Routes.Playlist}/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}