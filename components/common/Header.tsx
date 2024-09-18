import Link from 'next/link';

export default function Header() {
  return (
    <header className="m-0 px-4 py-4">
      <div className="flex justify-between items-center">
        <Link href={'/'}>
          <h5 className="text-lg">
            Steaming service
          </h5>
        </Link>

        <form role="search">
          <input className="input input-bordered input-primary w-full max-w-xs max-h-7 text-base"
                 type="search"
                 placeholder="Search..."
                 aria-label="Search" />
        </form>

        <div>
          <ul className="flex gap-2">
            <li><Link href={'/signup'}>Sign up</Link></li>
            <li><Link href={'/login'}>Log in</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}