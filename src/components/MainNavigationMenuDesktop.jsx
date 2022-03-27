import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';

import pages from '../utilities/navigation-pages.js';
import MenuItemDesktop from './styled/MenuItemDesktop.jsx';

const MainNavigationMenuDesktop = function MainNavigationMenuDesktopComponent({
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

export default MainNavigationMenuDesktop;
