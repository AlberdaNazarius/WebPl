import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { SIDEBAR_ITEMS } from '@/helpers/constants';

export default function Sidebar() {
  const TITLE: string = 'Playlists';
  return (
    <aside className={clsx(styles.aside, 'px-6 pt-2 fixed left-1.5 bottom-0 top-[3.75rem] rounded-lg')}>
      <h5 className="text-lg">
        {TITLE}
      </h5>
      <ul className={`ml-2 cursor-pointer ${styles.nav}`}>
        {SIDEBAR_ITEMS.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </aside>
  );
}