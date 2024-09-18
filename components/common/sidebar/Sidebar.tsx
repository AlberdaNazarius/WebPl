import styles from './Sidebar.module.scss'
import clsx from 'clsx';

export default function Sidebar() {
  const TITLE: string = 'Playlists'
  return (
    <aside className={clsx(styles.aside, 'px-6 pt-2 fixed left-0 bottom-0 top-[3.75rem]')}>
      <h5 className="text-lg">
        {TITLE}
      </h5>
      <ul className="ml-2">
        <li>Hehe</li>
        <li>Home</li>
        <li>Today</li>
        <li>Don't</li>
      </ul>
    </aside>
  )
}