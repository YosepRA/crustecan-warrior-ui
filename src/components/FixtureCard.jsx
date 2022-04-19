import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import FixtureCardTeamName from './styled/FixtureCardTeamName.jsx';
import { unavailableFeatureAlert } from '../utilities/helpers.js';

const FixtureCard = function FixtureCardComponent({
  fixture,
  buyButton,
  featured,
}) {
  const { _id, event, date, homeTeam, awayTeam } = fixture;
  const checkoutUrl = `/ticket/checkout/${_id}`;
  const dateStringMobile = featured ? 'MM/dd/yyyy' : 'd';
  const dateStringDesktop = 'EEEE, MMMM dd, yyyy';

  const handleFixtureDetails = () => {
    unavailableFeatureAlert('Fixture details');
  };

  return (
    <Paper
      sx={{
        maxWidth: { xs: 500, sm: 620 },
        mx: 'auto',
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
          mb: { xs: 0.8, sm: 1.2 },
        }}
      >
        <Typography sx={{ textTransform: 'uppercase' }}>{event}</Typography>
        <Typography sx={{ display: { sm: 'none' } }}>
          {format(date, dateStringMobile)}
        </Typography>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
          {format(date, dateStringDesktop)}
        </Typography>
      </Box>

      <Box
        component="section"
        className="fixture-teams"
        sx={{
          display: { sm: 'flex' },
          justifyContent: { sm: 'center' },
          alignItems: { sm: 'center' },
          mb: { xs: 0.8, sm: 1.2 },
          py: { xs: 1, sm: 3 },
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: featured ? 'primary.contrastText' : 'common.black',
          fontSize: '1.2rem',
        }}
      >
        <FixtureCardTeamName>{homeTeam}</FixtureCardTeamName>

        <Typography
          sx={{
            display: { xs: 'none', sm: 'block' },
            mx: 1.5,
            fontSize: 'inherit',
          }}
        >
          VS
        </Typography>

        <FixtureCardTeamName>{awayTeam}</FixtureCardTeamName>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: { sm: 'flex-start' } }}>
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
            onClick={handleFixtureDetails}
          >
            Details
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default FixtureCard;
