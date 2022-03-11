import React from 'react';
import Box from '@mui/material/Box';

import OverviewTicket from './OverviewTicket.jsx';
import OverviewTransaction from './OverviewTransaction.jsx';

const Overview = function OverviewComponent() {
  return (
    <Box component="section" className="dashboard__content overview">
      <OverviewTicket />

      <OverviewTransaction />
    </Box>
  );
};

export default Overview;
