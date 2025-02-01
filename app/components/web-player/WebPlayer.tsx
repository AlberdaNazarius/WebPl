'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './WebPlayer.module.scss';
import { IMAGE_SIZE_PLAYER, imagePath } from '@/app/helpers/constants';
import { SONGS } from '@/app/helpers/data';
import { Song } from '@/app/models/Song';

const WebPlayer: React.FC = () => {
  const [song, setSong] = useState<Song>()

  useEffect(() => {
    setSong(SONGS[0])
  }, []);

  return (
    <div className={styles.webPlayer}>
      <div className='pt-3 pl-3'>
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
        <div>

        </div>
      </div>
    </div>
  );
};

export default WebPlayer;