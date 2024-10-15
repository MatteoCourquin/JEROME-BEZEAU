import Link from 'next/link';
import { IconJB } from './Icons';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-between gap-y-default border-t border-t-white-12 px-x-default py-y-default md:flex-row md:gap-x-x-default">
      <div className="grow">
        <IconJB className="fill-white-80" />
        <div className="py-8">
          <p>Designed with love by me.</p>
          <p>
            Developped from scratch by{' '}
            <a href="https://matteo.courqu.in/" target="_blank" className="link link_white">
              Matteo Courquin
            </a>
            .
          </p>
        </div>
        <p>© Jérôme Bezeau - 2024</p>
      </div>
      <nav>
        <ul>
          <li className="pb-6 text-white-12">Socials</li>
          <li>
            <a className="link link_white" href="https://www.linkedin.com/in/jerome-bezeau/">
              Linkedin
            </a>
          </li>
          <li>
            <a className="link link_white" href="https://www.behance.net/jeromebezeb4eb">
              Behance
            </a>
          </li>
          <li>
            <a className="link link_white" href="https://www.instagram.com/jeromebezeau/">
              Instagram
            </a>
          </li>
          <li>
            <a className="link link_white" href="https://dribbble.com/jeromebezeau">
              Dribbble
            </a>
          </li>
          <li>
            <a className="link link_white" href="https://bento.me/jeromebezeau">
              Bento
            </a>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li className="pb-6 text-white-12">Menu</li>
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
            <Link className="link link_white" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
