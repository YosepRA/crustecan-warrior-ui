import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { easing } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { logoutThunk } from '../store/user/slice.js';
import BrandLink from './styled/BrandLink.jsx';
import MainNavigationMenuMobile from './MainNavigationMenuMobile.jsx';
import MainNavigationMenuDesktop from './MainNavigationMenuDesktop.jsx';

const Header = function HeaderComponent() {
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
    setOpen(state);
  };

  const handleLogout = () => {
    const navigateCallback = navigate.bind(null, '/');

    dispatch(logoutThunk(navigateCallback));
  };

  return (
    <Box component="nav" sx={{ mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { sm: 'center' } }}
          >
            <BrandLink to="/">Crustecan Warrior</BrandLink>
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { sm: 'none' },
            }}
            onClick={() => handleOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MainNavigationMenuDesktop
        authenticated={authenticated}
        handleLogout={handleLogout}
      />

      <Slide
        direction="left"
        in={open}
        timeout={400}
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
    </Box>
  );
};

export default Header;
