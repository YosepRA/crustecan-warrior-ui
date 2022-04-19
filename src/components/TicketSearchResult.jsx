import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import TicketCard from './ticket/TicketCard.jsx';

const TicketSearchResult = function TicketSearchResultComponent({
  ticket,
  isLoading,
  hasSubmitted,
}) {
  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />;
  }

  if (!ticket || !hasSubmitted) {
    return (
      <Box component="section">
        <Typography
          variant="h5"
          component="h2"
          color="textSecondary"
          sx={{ textAlign: 'center' }}
        >
          Enter your ticket ID using search box above.
        </Typography>
      </Box>
    );
  }

  if (!ticket.data) {
    return (
      <Box component="section">
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Search Result
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Ticket not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="section">
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Search Result
      </Typography>

      <TicketCard ticket={ticket.data} />
    </Box>
  );
};

export default TicketSearchResult;
