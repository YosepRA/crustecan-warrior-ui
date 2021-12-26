import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

const Dashboard = function DashboardComponent() {
  const user = useSelector((state) => state.user);

  return <Typography variant="h4">Welcome {user.username}</Typography>;
};

export default Dashboard;
