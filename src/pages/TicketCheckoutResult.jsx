import React from 'react';
import Typography from '@mui/material/Typography';

import withSearchParams from '../components/withSearchParams.jsx';

const TicketCheckoutResult = function TicketCheckoutResultComponent({
  search: { success },
}) {
  return (
    <Typography variant="h4" component="h1">
      TicketCheckoutResult success = {success}
    </Typography>
  );
};

export default withSearchParams(TicketCheckoutResult);
