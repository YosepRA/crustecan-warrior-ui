import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = function LayoutComponent() {
  return (
    <>
      <Header />

      <main className="content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
