import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { SIDEBAR_TITLE } from '@/app/helpers/constants';
import { Routes } from '@/app/helpers/routes';
import Link from 'next/link';
import { PLAYLISTS } from '@/app/helpers/data';

export default function Sidebar() {
  return (
    <aside className={clsx(styles.aside, 'pl-4 pr-8 pt-3 fixed left-1.5 bottom-0 top-[3.75rem] rounded-lg')}>
      <h5 className="text-lg text-white">
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