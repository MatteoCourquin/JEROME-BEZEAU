import Link from 'next/link';
import Button from './Button';
import { IconJB } from './Icons';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-[900] w-screen border-b border-b-white-12 px-x-default mix-blend- difference backdrop-blur-xl">
      <div className="flex h-24 items-center justify-between">
        <Link href="/">
          <IconJB className="fill-white opacity-80" />
        </Link>
        <nav>
          <ul className="flex items-center gap-10">
            <li>
              <Link className="link link_white" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="link link_white" href="/photography">
                Photography
              </Link>
            </li>
            <li>
              <Link className="link link_white" href="/about">
                About
              </Link>
            </li>
            <li>
              <Button as="a" href="/contact">
                Contact
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
