import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import pages from '../utilities/navigation-pages.js';
import MenuItemMobile from './styled/MenuItemMobile.jsx';
import DemoLogo from './styled/DemoLogo.jsx';

const MainNavigationMenuMobile = function MainNavigationMenuMobileComponent(
  { authenticated, handleOpen, handleLogout },
  ref,
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
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 'drawer',
        width: 1,
        height: 1,
        bgcolor: 'common.white',
        color: 'text.primary',
      }}
      onClick={handleMenuClick}
      ref={ref}
    >
      <Box
        component="header"
        className="menu-header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          px: 3,
        }}
      >
        <Box className="menu-logo" sx={{ flex: 1 }}>
          <DemoLogo />
        </Box>

        <IconButton
          size="large"
          color="inherit"
          aria-label="close"
          onClick={() => handleOpen(false)}
          sx={{ pr: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        className="menu-line-separator"
        sx={{
          height: '1px',
          mb: 3,
          bgcolor: 'common.black',
        }}
      />

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

export default forwardRef(MainNavigationMenuMobile);
