import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const FixtureCard = function FixtureCardComponent({ fixture, buyButton }) {
  const navigate = useNavigate();

  const date = new Date(fixture.date);

  const handleBuyButton = () => {
    const checkoutUrl = `/ticket/checkout/${fixture._id}`;

    navigate(checkoutUrl);
  };

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

      {buyButton && (
        <Button
          variant="contained"
          color="primary"
          sx={{ display: 'block', mt: 1 }}
          onClick={handleBuyButton}
        >
          Buy
        </Button>
      )}
    </Paper>
  );
};

export default FixtureCard;
