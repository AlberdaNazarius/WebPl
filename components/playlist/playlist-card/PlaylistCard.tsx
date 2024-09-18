import Link from 'next/link';
import Image from 'next/image';
import styles from './PlaylistCard.module.scss'
import clsx from 'clsx'

// type props = {
//
// }

export default function PlaylistCard() {
  const PLAYLIST = {
    name: 'Playlist',
    metadata: '...',
  };

  const IMAGE_SIZE: number = 222;

  return (
    <div className={clsx(styles.card, 'card m-4 bg-black text-white w-fit')}>
      <Link className={styles.pageLink} href="">
        <Image src="/images/Image.jpg"
               width={IMAGE_SIZE}
               height={IMAGE_SIZE}
               className={clsx(styles.image, 'card-img-top')}
               alt="image" />
        <div className="card-body pt-4">
          <h3 className="m-0">{PLAYLIST.name}</h3>
          <p className="">{PLAYLIST.metadata}</p>
        </div>
      </Link>
    </div>
  );
}