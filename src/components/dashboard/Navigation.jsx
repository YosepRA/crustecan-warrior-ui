import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useRouteMatch from '../hooks/useRouteMatch.jsx';

const Navigation = function DashboardNavigationComponent() {
  const routeMatch = useRouteMatch([
    '/dashboard/overview',
    '/dashboard/ticket',
    '/dashboard/transaction',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs
      value={currentTab}
      component="nav"
      variant="standard"
      sx={{ mb: 2 }}
      className="dashboard__navigation"
    >
      <Tab
        label="Overview"
        value="/dashboard/overview"
        component={RouterLink}
        to="overview"
      />
      <Tab
        label="Tickets"
        value="/dashboard/ticket"
        component={RouterLink}
        to="ticket"
      />
      <Tab
        label="Transactions"
        value="/dashboard/transaction"
        component={RouterLink}
        to="transaction"
      />
    </Tabs>
  );
};

export default Navigation;
