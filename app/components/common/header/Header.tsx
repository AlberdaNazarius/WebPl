'use client';
import Link from 'next/link';
import { Routes } from '@/app/helpers/routes';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AuthService } from '@/app/services/auth.service';
import { useEffect, useState } from 'react';

export default function Header() {
  const [auth, setAuth] = useState(false);
  
  const handleLogout = () => {
    AuthService.logout();
    setAuth(false);
  }

  useEffect(() => {
    setAuth(AuthService.isAuthenticated);
  }, []);

  return (
    <header className="m-0 px-4 py-4 bg-[#0a0a0a] fixed top-0 left-0 right-0 h-[3.75rem] z-10">
      <div className="flex justify-between items-center">
        <Link href={Routes.Home}>
          <h5 className="text-lg">
            Steaming service
          </h5>
        </Link>

        {/*<form role="search">*/}
        <input className="input input-bordered w-full max-w-xs max-h-7 text-base"
               type="search"
               placeholder="Search..."
               aria-label="Search" />
        {/*</form>*/}

        <div>
          {!auth &&
            <ul className={clsx(styles.authNav, 'flex gap-3')}>
              <li><Link href={Routes.Signup}>Sign up</Link></li>
              <li><Link href={Routes.Login}>Log in</Link></li>
            </ul>
          }
          {auth &&
            <ul className={clsx(styles.authNav, 'flex gap-3')}>
              <li>User</li>
              <li
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </li>
            </ul>
          }
        </div>
      </div>
    </header>
  );
}