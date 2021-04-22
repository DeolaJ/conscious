import React from 'react';

const Footer = () => (
  <footer className="w-full px-6 py-16 md:px-10 bg-rose-800">
    <article className="text-base tracking-wide text-center text-white copywrite-content">
      {'©'}
      {new Date().getFullYear()}
      {' - Angular Rank'}
    </article>
  </footer>
);

export default Footer;
