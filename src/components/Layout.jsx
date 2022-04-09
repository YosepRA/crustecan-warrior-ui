import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import MainNavigation from './MainNavigation.jsx';
// import Footer from './Footer.jsx';

const Layout = function LayoutComponent() {
  const scrollTrigger = useScrollTrigger();

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <MainNavigation scrollTrigger={scrollTrigger} />

      <Box component="main" sx={{ mt: '80px', pb: '5rem' }} className="content">
        <Outlet />
      </Box>

      {/* <Footer /> */}

      <Zoom in={scrollTrigger}>
        <Fab
          size="small"
          color="primary"
          onClick={handleClick}
          sx={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default Layout;
