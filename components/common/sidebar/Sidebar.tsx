import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { PLAYLISTS, SIDEBAR_TITLE } from '@/app/helpers/constants';
import { Routes } from '@/app/helpers/routes';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className={clsx(styles.aside, 'px-6 pt-2 fixed left-1.5 bottom-0 top-[3.75rem] rounded-lg')}>
      <h5 className="text-lg">
        {SIDEBAR_TITLE}
      </h5>
      <ul className={`ml-2 cursor-pointer ${styles.nav}`}>
        {PLAYLISTS.map((item) => (
          <li key={item.id}>
            <Link href={`${Routes.Playlist}/${item.id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}