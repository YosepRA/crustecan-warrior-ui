import React from 'react';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const TicketCheckoutFixtureInfo = function TicketCheckoutFixtureInfoComponent({
  fixture: { date, homeTeam, awayTeam, event },
}) {
  const dateString = format(new Date(date), 'MM/dd/yyyy - HH:mm');

  return (
    <Box component="section" className="checkout__fixture-info" sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        You are currently booking for:
      </Typography>

      <Paper
        sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography>{event}</Typography>

          <Typography>{dateString}</Typography>
        </Stack>

        <Box>
          <Typography sx={{ textAlign: 'left' }}>
            {homeTeam} vs {awayTeam}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketCheckoutFixtureInfo;
