import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import FixtureCardTeamName from './styled/FixtureCardTeamName.jsx';

const FixtureCard = function FixtureCardComponent({
  fixture,
  buyButton,
  featured,
}) {
  const { _id, event, date, homeTeam, awayTeam } = fixture;
  const checkoutUrl = `/ticket/checkout/${_id}`;

  return (
    <Paper
      sx={{
        bgcolor: featured ? 'primary.main' : 'background.paper',
        p: 2,
        color: featured ? 'primary.contrastText' : 'text.black',
        ':not(:last-child)': { mb: 1 },
      }}
      elevation={2}
      component="article"
    >
      <Box
        component="section"
        className="fixture-metadata"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 0.8,
        }}
      >
        <Typography sx={{ textTransform: 'uppercase' }}>{event}</Typography>
        <Typography>{format(date, 'd')}</Typography>
      </Box>

      <Box
        component="section"
        className="fixture-teams"
        sx={{
          mb: 0.8,
          py: 1,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: featured ? 'primary.contrastText' : 'common.black',
        }}
      >
        <FixtureCardTeamName>{homeTeam}</FixtureCardTeamName>
        <FixtureCardTeamName>{awayTeam}</FixtureCardTeamName>
      </Box>

      {buyButton ? (
        <Button
          component={Link}
          to={checkoutUrl}
          variant="text"
          color="primary"
          sx={{
            display: 'inline',
            p: 0,
            fontSize: 'body1.fontSize',
            color: featured ? 'primary.contrastText' : 'primary.main',
          }}
        >
          Buy Ticket
        </Button>
      ) : (
        <Button
          variant="text"
          color="primary"
          sx={{
            p: 0,
            fontSize: 'body1.fontSize',
            color: featured ? 'primary.contrastText' : 'primary.main',
          }}
        >
          Details
        </Button>
      )}
    </Paper>
  );
};

export default FixtureCard;
