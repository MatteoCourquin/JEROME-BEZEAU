import Link from 'next/link';
import { IconJB } from './Icons';

const Header = () => {
  return (
    <header className="px-x-default border-b-white-12 fixed left-0 top-0 z-[900] w-screen border-b mix-blend-difference">
      <div className="flex h-24 items-center justify-between">
        <Link href="/">
          <IconJB className="fill-white" />
        </Link>
        <nav>
          <ul className="flex gap-10">
            <li>
              <Link className="link link_white !text-white" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="link link_white !text-white" href="/photography">
                Photography
              </Link>
            </li>
            <li>
              <Link className="link link_white !text-white" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="link link_white !text-white" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
