import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HonorCard = function HonorCardComponent({ honor }) {
  return (
    <Grid item component="article" xs={12} className="honors__card">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 240,
          height: 240,
          m: 'auto',
          p: 2,
          bgcolor: grey[200],
          textAlign: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: '4rem' }}>
            <FontAwesomeIcon icon="fa-trophy" />
          </Typography>
          <Typography variant="h2">{honor.total}</Typography>
        </Stack>

        <Typography variant="h5">{honor.name}</Typography>
      </Paper>
    </Grid>
  );
};

export default HonorCard;
