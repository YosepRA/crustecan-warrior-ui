import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Navigation from '../components/dashboard/Navigation.jsx';

const Dashboard = function DashboardComponent() {
  return (
    <Container>
      <Navigation />

      <Outlet />
    </Container>
  );
};

export default Dashboard;
