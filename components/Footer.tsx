import Link from 'next/link';
import { IconJB } from './atoms/Icons';
import { useContext } from 'react';
import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';

const Footer = () => {
  const { isFrench, setIsFrench } = useContext(LanguageContext);
  return (
    <footer className="flex flex-col-reverse justify-between gap-y-default border-t border-t-white-12 px-x-default py-y-default md:flex-row md:gap-x-x-default">
      <div className="flex grow flex-col justify-between">
        <Link className="cursor-button w-fit" href="/" scroll={false}>
          <IconJB className="fill-white-80" />
        </Link>
        <div className="pt-8">
          <button className="cursor-button text-white-40" onClick={() => setIsFrench(!isFrench)}>
            <span className={clsx(isFrench && 'text-white-80')}>FR </span>/{' '}
            <span className={clsx(!isFrench && 'text-white-80')}>EN</span>
          </button>
        </div>
        <div className="py-8">
          <p>Designed with love by me.</p>
          <p>
            Developped from scratch by{' '}
            <a
              className="link cursor-button link_white-80"
              href="https://matteo.courqu.in/"
              target="_blank"
            >
              Matteo Courquin
            </a>
            .
          </p>
        </div>
        <p>© Jérôme Bezeau - 2024</p>
      </div>
      <div className="flex gap-x-default">
        <nav className="grow">
          <ul className="flex flex-col gap-2">
            <li className="pb-2 uppercase text-white-12">Menu</li>
            <li>
              <Link className="link cursor-button link_white-40" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link cursor-button link_white-40" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="link cursor-button link_white-40" href="/photography">
                Photography
              </Link>
            </li>
            <li>
              <Link className="link cursor-button link_white-40" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="link cursor-button link_white-40" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="grow">
          <ul className="flex flex-col gap-2">
            <li className="pb-2 uppercase text-white-12">Socials</li>
            <li>
              <a
                className="link cursor-button link_white-40"
                href="https://www.linkedin.com/in/jerome-bezeau/"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                className="link cursor-button link_white-40"
                href="https://www.behance.net/jeromebezeb4eb"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                className="link cursor-button link_white-40"
                href="https://www.instagram.com/jeromebezeau/"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="link cursor-button link_white-40"
                href="https://dribbble.com/jeromebezeau"
              >
                Dribbble
              </a>
            </li>
            <li>
              <a className="link cursor-button link_white-40" href="https://bento.me/jeromebezeau">
                Bento
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
