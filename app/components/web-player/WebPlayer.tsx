'use client'
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import Image from 'next/image';
import styles from './WebPlayer.module.scss';
import { IMAGE_SIZE_PLAYER, imagePath } from '@/app/helpers/constants';
import 'react-h5-audio-player/lib/styles.css';
import { Song } from '@/app/models/Song';
import './WebPlayer.scss';
import usePlayerStore from '@/app/store/PlayerStore';

const WebPlayer: React.FC = () => {
  const {curSongId, curPlaylistId, getCurSong, nextSong, prevSong} = usePlayerStore();
  const [song, setSong] = useState<Song>()

  useEffect(() => {
    if (!getCurSong()) {
      return;
    }
    setSong(getCurSong());
  }, [curSongId, curPlaylistId, getCurSong]);

  return (
    <div className={styles.webPlayer}>
      <div className='pt-3 pl-3 flex gap-20'>
        <div className='flex'>
          <Image
            src={song?.image || `${imagePath}/Image.jpg`}
            className='w-[80px] h-[80px] rounded-lg'
            width={IMAGE_SIZE_PLAYER}
            height={IMAGE_SIZE_PLAYER}
            alt='preview image'
          />
          <div className='ml-3 w-[150px]'>
            <h6 className='text-white'>{song?.name}</h6>
            <span>{song?.album}</span>
          </div>
        </div>
        <div className='w-full pr-2'>
          <AudioPlayer
            src={song?.songKey ?? ''}
            onClickPrevious={prevSong}
            onClickNext={nextSong}
            onEnded={nextSong}
            autoPlay={false}
            autoPlayAfterSrcChange={true}
            showJumpControls={false}
            showSkipControls={true}
          />
        </div>
      </div>
    </div>
  );
};

export default WebPlayer;