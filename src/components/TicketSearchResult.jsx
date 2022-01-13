import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const TicketSearchResult = function TicketSearchResultComponent({
  hasSubmitted,
}) {
  const ticket = useSelector((state) => state.ticket);

  if (!hasSubmitted) {
    return (
      <Box component="section">
        <Typography variant="h5" component="h2" color="textSecondary">
          Enter your ticket ID using search box above.
        </Typography>
      </Box>
    );
  }

  if (ticket.data === null) {
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

  const {
    loading,
    data: {
      _id,
      seat: { section, seatNumber },
      fixture: { homeTeam, awayTeam, event, date },
    },
  } = ticket;

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />;
  }

  return (
    <Box component="section">
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Search Result
      </Typography>

      <Paper sx={{ p: 2, ':not(:last-child)': { mb: 1 } }} elevation={2}>
        <Box component="section" className="ticket-meta" sx={{ mb: 1 }}>
          <Typography variant="body2">
            <b>{_id}</b>
          </Typography>
        </Box>

        <Box component="section" className="ticket-details">
          <Typography variant="h6" sx={{ py: 3, textAlign: 'center' }}>
            {homeTeam} vs {awayTeam}
          </Typography>

          <Typography>Seat: {`${section}-${seatNumber}`}</Typography>
          <Typography>Event: {event}</Typography>

          {date && (
            <Typography>
              Time: {format(new Date(date), 'EEEE, MMMM d, yyyy - HH:mm')}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketSearchResult;
