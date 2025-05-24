import Link from 'next/link';
import Image from 'next/image';
import styles from './PlaylistCard.module.scss';
import clsx from 'clsx';
import { Routes } from '@/app/helpers/routes';
import { IMAGE_SIZE_X, IMAGE_SIZE_Y, imagePathPlaylist } from '@/app/helpers/constants';
import { Playlist } from '@/app/models/Playlist';
import React from 'react';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <div className={clsx(styles.card, 'card m-4 bg-black text-white w-fit')}>
      <Link href={`${Routes.Playlist}/${playlist.id}`}>
        <Image
          src={`${imagePathPlaylist}/${playlist.imageKey}`}
          width={IMAGE_SIZE_X}
          height={IMAGE_SIZE_Y}
          className={clsx(styles.image, 'card-img-top')}
          alt="image"
        />
        <div className="card-body pt-3 pb-4 pl-4">
          <h3 className="m-0 text-lg">{playlist.name}</h3>
          <p className="text-sm">MyPl • {playlist.songs.length} songs</p>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;