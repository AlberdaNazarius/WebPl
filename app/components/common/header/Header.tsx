'use client';
import Link from 'next/link';
import { Routes } from '@/app/helpers/routes';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AuthService } from '@/app/services/auth.service';
import React, { useEffect, useRef, useState } from 'react';
import { SongService } from '@/app/services/song.service';
import { Song } from '@/app/models/Song';
import usePlayerStore from '@/app/store/PlayerStore';
import RecommendBtn from '@/app/components/recommendations/RecommendBtn';
import useAuthStore from '@/app/store/AuthStore';
import RightClickModal from '@/app/components/right-click-modal/RightClickModal';
import { PlaylistService } from '@/app/services/playlist.service';

export default function Header() {
  const { credentials } = useAuthStore();
  const { getPlaylists } = usePlayerStore();
  const [auth, setAuth] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { setSelectedSong } = usePlayerStore();

  const fetchSongs = async () => {
    setSongs(await SongService.getAllSongs());
  };

  const filteredSongs: Song[] = songs.filter((song: Song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogout = async () => {
    await AuthService.logout();
  };

  const addSongToPlaylist = async (playlistId: number, songId: number) => {
    await PlaylistService.addSong(playlistId, songId);
  };

  useEffect(() => {
    setAuth(AuthService.isAuthenticated);
    fetchSongs();

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    setAuth(AuthService.isAuthenticated());
  }, [credentials]);

  return (
    <header className="m-0 px-4 py-4 bg-[#0a0a0a] fixed top-0 left-0 right-0 h-[3.75rem] z-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <RecommendBtn />
          <Link href={Routes.Home}>
            <h5 className="text-lg hover:text-white">
              Steaming service
            </h5>
          </Link>
        </div>

        <div className="relative grow max-w-96" ref={searchRef} onClick={() => setShowSearchResults(true)}>
          <input className="input input-bordered w-full max-h-7 text-base"
                 type="search"
                 placeholder="Search..."
                 aria-label="Search"
                 onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showSearchResults && filteredSongs.length > 0 &&
            <div
              className="absolute bg-[#34373d] rounded left-0 right-0 pt-3 pb-1 px-3 mt-1 max-h-[160px] overflow-y-auto">
              {filteredSongs.map((song) => (
                <RightClickModal key={song?.songKey} menuContent={(
                  <div className="bg-[#4a4f57] shadow-lg rounded-md min-w-24 px-2">
                    <ul className="space-y-2 text-center">
                      {getPlaylists().map((playlist) => (
                        <li key={playlist.id}>
                          <button
                            className="hover:text-white w-full p-1"
                            onClick={() => addSongToPlaylist(playlist.id, song.id)}
                          >
                            {playlist.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}>
                  <div
                    onClick={() => setSelectedSong(song)}
                    className="bg-[#4a4f57] py-1 mb-2 rounded-lg text-center hover:text-white cursor-pointer"
                  >
                    {song.name}
                  </div>
                </RightClickModal>
              ))}
            </div>
          }
        </div>

        {!auth &&
          <ul className={clsx(styles.authNav, 'flex gap-3')}>
            <li><Link href={Routes.Signup}>Sign up</Link></li>
            <li><Link href={Routes.Login}>Log in</Link></li>
          </ul>
        }
        {auth &&
          <ul className={clsx(styles.authNav, 'flex gap-3')}>
            <li>{credentials?.username || 'User'}</li>
            <li
              className="cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </li>
          </ul>
        }
      </div>

    </header>
  );
}