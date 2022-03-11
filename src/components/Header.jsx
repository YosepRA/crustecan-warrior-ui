import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { styled, easing } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { logoutThunk } from '../store/user/slice.js';

/* We'll be using two different navigation menu for mobile and desktop to
accomplish intended design. */

const pages = [
  { to: '/', label: 'Home' },
  { to: '/fixtures', label: 'Fixtures' },
  { to: '/ticket/fixtures', label: 'Buy Ticket' },
  { to: '/ticket/search', label: 'Search Ticket' },
];

const BrandLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));

const MenuItemMobile = styled('p')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  fontSize: '1.2rem',
  color: theme.palette.primary.contrastText,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    '&.active': {
      textDecoration: 'underline',
    },
  },
  '& button': {
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontSize: 'inherit',
  },
}));

const MenuItemDesktop = styled('p')(({ theme }) => ({
  display: 'inline-block',
  margin: `0 ${theme.spacing(1)}`,
  fontFamily: `Oswald, ${theme.typography.fontFamily}`,
  color: theme.palette.text.primary,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: theme.palette.text.secondary,
    },
    '&.active': {
      color: theme.palette.text.secondary,
      textDecoration: 'underline',
    },
  },
  '& button': {
    background: 'none',
    padding: 0,
    border: 'none',
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer',
    ':hover': {
      color: theme.palette.text.secondary,
    },
  },
}));

const NavigationMenuMobile = function NavigationMenuMobileComponent(
  authenticated,
  handleOpen,
  handleLogout,
) {
  const handleMenuClick = ({ target }) => {
    const allowedTags = ['a', 'button'];

    if (allowedTags.includes(target.tagName.toLowerCase())) {
      handleOpen(false);
    }
  };

  const menuItems = pages.map(({ to, label }) => (
    <MenuItemMobile key={label}>
      <NavLink to={to}>{label}</NavLink>
    </MenuItemMobile>
  ));

  return (
    <Box
      className="menu"
      sx={{
        display: { sm: 'none' },
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 'drawer',
        width: 1,
        height: 1,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
      onClick={handleMenuClick}
    >
      <Box
        component="header"
        className="menu-header"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          size="large"
          color="inherit"
          aria-label="close"
          onClick={() => handleOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="section" className="menu-list">
        {menuItems}

        {/* User authentication related items. */}

        {authenticated ? (
          <>
            <MenuItemMobile>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </MenuItemMobile>
            <MenuItemMobile>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </MenuItemMobile>
          </>
        ) : (
          <>
            <MenuItemMobile>
              <NavLink to="/login">Login</NavLink>
            </MenuItemMobile>
            <MenuItemMobile>
              <NavLink to="/register">Register</NavLink>
            </MenuItemMobile>
          </>
        )}
      </Box>
    </Box>
  );
};

const NavigationMenuDesktop = function NavigationMenuDesktopComponent({
  authenticated,
  handleLogout,
}) {
  const menuItems = pages.map(({ to, label }) => (
    <MenuItemDesktop key={label}>
      <NavLink to={to}>{label}</NavLink>
    </MenuItemDesktop>
  ));

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: { sm: 'center' },
        p: 1,
        bgcolor: 'white',
        borderBottom: 1,
      }}
    >
      {menuItems}

      {authenticated ? (
        <>
          <MenuItemDesktop>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </MenuItemDesktop>
          <MenuItemDesktop>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </MenuItemDesktop>
        </>
      ) : (
        <>
          <MenuItemDesktop>
            <NavLink to="/login">Login</NavLink>
          </MenuItemDesktop>
          <MenuItemDesktop>
            <NavLink to="/register">Register</NavLink>
          </MenuItemDesktop>
        </>
      )}
    </Box>
  );
};

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

      <NavigationMenuDesktop
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
        {NavigationMenuMobile(authenticated, handleOpen, handleLogout)}
      </Slide>
    </Box>
  );
};

export default Header;
