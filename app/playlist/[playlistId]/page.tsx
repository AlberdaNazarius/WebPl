'use client';
import Image from 'next/image';
import { PLAYLIST, PLAYLIST_TABLE_HEADERS, SONGS } from '@/helpers/constants';
import styles from './Playlist.module.scss';

export default function Playlist() {
  return (
    <div className="flex justify-center pl-4 main-container">
      <div className="container mt-6 mb-4">
        <div className="flex flex-row mb-4 relative">
          <Image width={232}
                 height={174}
                 src={'/images/Image.jpg'}
                 alt="playlist_image" />
          <div className="card-body">
            <span className="my-0 text-sm">{PLAYLIST.scope}</span>
            <h1 className="font-bold text-7xl">{PLAYLIST.name}</h1>
            <span className="absolute bottom-0">{PLAYLIST.metadata}</span>
          </div>
        </div>
        <hr />
        <div className="w-full mt-3">
          <table className='w-[100%] border-separate border-spacing-y-3'>
            <thead>
              <tr>
                {PLAYLIST_TABLE_HEADERS.map((header) => (
                  <th key={header} scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className='text-center'>
              {SONGS.map((song, index) => (
                <tr key={song.id} className={`${styles.songItem}`}>
                  <th scope="row">{index+1}</th>
                  <td>{song.name}</td>
                  <td>{song.album}</td>
                  <td>{song.dateAdded}</td>
                  <td>{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}