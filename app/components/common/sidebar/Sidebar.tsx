'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { SIDEBAR_TITLE } from '@/app/helpers/constants';
import { Routes } from '@/app/helpers/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PlaylistService } from '@/app/services/playlist.service';
import CreatePlaylistBtn from '@/app/components/playlist/create-playlist/CreatePlaylistBtn';
import RightClickModal from '@/app/components/right-click-modal/RightClickModal';
import usePlaylistsStore from '@/app/store/PlaylistsStore';

export default function Sidebar() {
  const { playlistId } = useParams();
  const {userPlaylists} = usePlaylistsStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);

  const handleRemovePlaylist = async (id: number) => {
    await PlaylistService.removePlaylist(id);
  }

  useEffect(() => {
    if (!playlistId) {
      setSelectedPlaylist(-1);
      return;
    }

    const id = parseInt(playlistId as string, 10);
    setSelectedPlaylist(id);
  }, [playlistId]);

  return (
    <aside
      className={clsx(styles.aside, 'w-[225px] pl-4 pr-1 pt-3 fixed left-2 bottom-[106px] top-[3.75rem] rounded-lg')}>
      <div className="relative">
        <h5 className="text-lg text-white">
          {SIDEBAR_TITLE}
        </h5>
        <CreatePlaylistBtn />
      </div>
      <ul className={`mt-2 pl-2 cursor-pointer ${styles.nav}`}>
        {userPlaylists.length > 0 && userPlaylists.map((item) => (
          <RightClickModal key={item.id} menuContent={(
            <div className="bg-[#4a4f57] shadow-lg rounded-md min-w-24 px-2">
              <ul className="space-y-2 text-center">
                <li>
                  <button
                    className="hover:text-white w-full p-1"
                    onClick={() => handleRemovePlaylist(item.id)}>
                    remove
                  </button>
                </li>
              </ul>
            </div>
          )}>
            <li
              key={item.id}
              className={clsx(
                selectedPlaylist === item.id ? 'font-bold text-white' : '',
                'w-full overflow-hidden mb-1',
              )}
            >
              <Link className="block w-full text-ellipsis overflow-hidden whitespace-nowrap"
                    href={`${Routes.Playlist}/${item.id}`}>
                {item.name}
              </Link>
            </li>
          </RightClickModal>
        ))}
      </ul>
    </aside>
  );
}