import React from 'react';
import PropTypes from 'prop-types';
import Global from '../styled/global';
import Footer from './footer';
import Nav from './nav';

function Layout({ children, className, style }) {
  return (
    <>
      <Global />
      <Nav />
      <main className={className} style={style}>
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  className: '',
  style: {},
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

export default Layout;
