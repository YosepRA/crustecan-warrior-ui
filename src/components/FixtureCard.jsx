import React from 'react';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const FixtureCard = function FixtureCardComponent({ fixture }) {
  const date = new Date(fixture.date);

  return (
    <Paper sx={{ p: 2, ':not(:last-child)': { mb: 1 } }} elevation={2}>
      <Box component="section" className="fixture-meta" sx={{ mb: 1 }}>
        <Typography>
          <b>{fixture.event}</b>
        </Typography>
        <Typography>{format(date, 'EEEE, MMMM d, yyyy')}</Typography>
        <Typography>{format(date, 'HH:mm OOOO')}</Typography>
      </Box>

      <Box component="section" className="fixture-teams">
        <Typography>Home: {fixture.homeTeam}</Typography>
        <Typography>Away: {fixture.awayTeam}</Typography>
      </Box>
    </Paper>
  );
};

export default FixtureCard;
