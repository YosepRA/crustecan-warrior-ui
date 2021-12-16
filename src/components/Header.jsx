import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { styled, easing } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

/* We'll be using two different navigation menu for mobile and desktop to
accomplish intended design. */

const pages = [
  { to: '/', label: 'Home' },
  { to: '/fixtures', label: 'Fixtures' },
  { to: '/ticket/fixtures', label: 'Buy Ticket' },
  { to: '/ticket/search', label: 'Search Ticket' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
];

const MenuItemMobile = styled(NavLink)(({ theme }) => ({
  display: 'block',
  padding: theme.spacing(1.5),
  textAlign: 'center',
  fontSize: '1.2rem',
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));

const MenuItemDesktop = styled(NavLink)(({ theme }) => ({
  display: 'inline-block',
  margin: `0 ${theme.spacing(1)}`,
  fontFamily: `Oswald, ${theme.typography.fontFamily}`,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  ':hover': {
    color: theme.palette.text.secondary,
  },
  '&.active': {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
  },
}));

const NavigationMenuMobile = function NavigationMenuMobileComponent(
  handleOpen,
) {
  const menuItems = pages.map(({ to, label }) => (
    <MenuItemMobile key={label} to={to} onClick={() => handleOpen(false)}>
      {label}
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
        width: 1,
        height: 1,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
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
      </Box>
    </Box>
  );
};

const NavigationMenuDesktop = function NavigationMenuDesktopComponent() {
  const menuItems = pages.map(({ to, label }) => (
    <MenuItemDesktop key={label} to={to}>
      {label}
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
    </Box>
  );
};

const Header = function HeaderComponent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
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

  return (
    <Box component="nav" sx={{ mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { sm: 'center' } }}
          >
            Crustecan Warrior
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

      <NavigationMenuDesktop />

      <Slide
        direction="left"
        in={open}
        timeout={400}
        easing={{ enter: easing.easeOut, exit: easing.easeOut }}
        mountOnEnter
        unmountOnExit
      >
        {NavigationMenuMobile(handleOpen)}
      </Slide>
    </Box>
  );
};

export default Header;
