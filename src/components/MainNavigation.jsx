import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { easing } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { logoutThunk } from '../store/user/slice.js';
import DemoLogo from './styled/DemoLogo.jsx';
import Backdrop from './styled/Backdrop.jsx';
import MainNavigationMenuMobile from './MainNavigationMenuMobile.jsx';
import MainNavigationMenuDesktop from './MainNavigationMenuDesktop.jsx';

const Header = function HeaderComponent({ scrollTrigger }) {
  const [open, setOpen] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Close menu whenever the screen resizes.
    const handleResize = () => {
      if (open === false) return undefined;

      return setOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpen = (state) => {
    // Disable document body scroll on mobile menu open.
    const bodyScroll = state ? 'hidden' : 'auto';
    document.body.style.overflow = bodyScroll;

    setOpen(state);
  };

  const handleLogout = () => {
    const navigateCallback = navigate.bind(null, '/');

    dispatch(logoutThunk(navigateCallback));
  };

  return (
    <Box className="main-nav" component="nav">
      <Slide appear={false} direction="down" in={!scrollTrigger}>
        <AppBar sx={{ bgcolor: 'common.white', color: 'text.primary' }}>
          <Box
            className="main-nav__accent"
            sx={{
              width: 1,
              height: 16,
              bgcolor: 'primary.main',
            }}
          />

          <Toolbar
            sx={{
              justifyContent: { xs: 'space-between', sm: 'center' },
            }}
          >
            <Link className="main-nav__brand-link" to="/">
              <DemoLogo className="main-nav__brand-icon" />
            </Link>

            <IconButton
              size="large"
              aria-label="menu"
              sx={{
                display: { sm: 'none' },
              }}
              onClick={() => handleOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <MainNavigationMenuDesktop
            authenticated={authenticated}
            handleLogout={handleLogout}
          />
        </AppBar>
      </Slide>

      <Slide
        direction="left"
        in={open}
        timeout={300}
        easing={{ enter: easing.easeOut, exit: easing.easeOut }}
        mountOnEnter
        unmountOnExit
      >
        <MainNavigationMenuMobile
          authenticated={authenticated}
          handleOpen={handleOpen}
          handleLogout={handleLogout}
        />
      </Slide>

      <Backdrop open={open} />
    </Box>
  );
};

export default Header;
