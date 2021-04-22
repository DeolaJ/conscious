import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Home from '../../assets/images/home.svg';

const navItems = [
  {
    text: 'Home',
    link: '/',
    icon: Home,
  },
];

function Nav() {
  const [isMobile, setIsMobile] = useState(document.body.clientWidth < 768);

  function setMobileState() {
    return document.body.clientWidth < 768;
  }

  const resetPreview = debounce(() => {
    const mobile = setMobileState();
    setIsMobile(mobile);
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', resetPreview);
    setMobileState();

    return () => window.removeEventListener('resize', resetPreview);
  }, [resetPreview]);

  return (
    <header className="px-8 py-6 bg-gray-800">
      <nav className="flex items-center justify-between">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100">
          <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
            <path
              fillRule="evenodd"
              fill="white"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
        <ul>
          {navItems.map((navItem) => (
            <li key={navItem.text}>
              <Link to={navItem.link} className="text-sm text-white hover:underline">
                {!isMobile ? (
                  navItem.text
                ) : (
                  <img
                    src={navItem.icon}
                    alt={navItem.text}
                    className="w-7 opacity-80 hover:opacity-100"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
