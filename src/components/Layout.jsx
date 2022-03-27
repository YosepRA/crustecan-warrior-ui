import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import MainNavigation from './MainNavigation.jsx';
// import Footer from './Footer.jsx';

const Layout = function LayoutComponent() {
  return (
    <>
      <MainNavigation />

      <Box component="main" sx={{ pb: '5rem' }} className="content">
        <Outlet />
      </Box>

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
