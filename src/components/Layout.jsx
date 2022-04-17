import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import MainNavigation from './MainNavigation.jsx';
import Footer from './Footer.jsx';

const Layout = function LayoutComponent() {
  const scrollTrigger = useScrollTrigger();

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <MainNavigation scrollTrigger={scrollTrigger} />

      <Box
        component="main"
        className="content"
        sx={{
          // 100 vh minus content section's margin top, minus footer height, minus ~
          // ~ content section's margin bottom.
          minHeight: (theme) => ({
            xs: `calc(100vh - 80px - 100px - ${theme.spacing(8)})`,
            sm: `calc(100vh - 137px - 100px - ${theme.spacing(8)})`,
          }),
          mt: { xs: '80px', sm: '137px' },
          mb: 8,
        }}
      >
        <Outlet />
      </Box>

      <Footer />

      <Zoom in={scrollTrigger}>
        <Tooltip title="Back to top" placement="left">
          <Fab
            size="small"
            color="primary"
            onClick={handleClick}
            sx={{
              position: 'fixed',
              bottom: 40,
              right: 20,
              zIndex: 1050,
            }}
            aria-label="Back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </>
  );
};

export default Layout;
