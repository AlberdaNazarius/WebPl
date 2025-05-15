'use client'
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import Image from 'next/image';
import styles from './WebPlayer.module.scss';
import { IMAGE_SIZE_PLAYER, imagePath } from '@/app/helpers/constants';
import { SONGS } from '@/app/helpers/data';
import 'react-h5-audio-player/lib/styles.css';
import { Song } from '@/app/models/Song';
import './WebPlayer.scss';

const WebPlayer: React.FC = () => {
  const [song, setSong] = useState<Song>()

  useEffect(() => {
    setSong(SONGS[0])
  }, []);

  return (
    <div className={styles.webPlayer}>
      <div className='pt-3 pl-3 flex gap-20'>
        <div className='flex'>
          <Image
            src={song?.image || `${imagePath}/Image.jpg`}
            width={IMAGE_SIZE_PLAYER}
            height={IMAGE_SIZE_PLAYER}
            alt='preview image'
          />
          <div className='ml-3'>
            <h6 className='text-white'>{song?.name}</h6>
            <span>{song?.album}</span>
          </div>
        </div>
        <div className='w-full pr-2'>
          <AudioPlayer
            src={""}
            autoPlay={false}
            onPlay={() => console.log("Playing")}
          />
        </div>
      </div>
    </div>
  );
};

export default WebPlayer;