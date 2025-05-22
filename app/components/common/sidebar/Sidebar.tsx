'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { SIDEBAR_TITLE } from '@/app/helpers/constants';
import { Routes } from '@/app/helpers/routes';
import Link from 'next/link';
import { PLAYLISTS } from '@/app/helpers/data';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Sidebar() {
  const { playlistId } = useParams();
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);

  useEffect(() => {
    if (!playlistId) {
      setSelectedPlaylist(-1);
      return;
    }

    const id = parseInt(playlistId[0]);
    setSelectedPlaylist(id);
  }, [playlistId]);

  return (
    <aside className={clsx(styles.aside, 'pl-4 pr-8 pt-3 fixed left-1.5 bottom-0 top-[3.75rem] rounded-lg')}>
      <h5 className="text-lg text-white">
        {SIDEBAR_TITLE}
      </h5>
      <ul className={`ml-2 cursor-pointer ${styles.nav}`}>
        {PLAYLISTS.map((item) => (
          <li
            key={item.id}
            className={selectedPlaylist === item.id ? 'font-bold text-white' : ''}
          >
            <Link href={`${Routes.Playlist}/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}