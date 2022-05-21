import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { useGetTicketListQuery } from '../../store/dashboard/service.js';
import OverviewSectionHeader from './OverviewSectionHeader.jsx';
import TicketCard from '../ticket/TicketCard.jsx';

const OverviewTicket = function OverviewTicketComponent() {
  const { data: queryData, isLoading } = useGetTicketListQuery({
    latest: true,
  });

  if (isLoading) {
    return (
      <Box component="section" className="overview__ticket" sx={{ mb: 5 }}>
        <OverviewSectionHeader title="Latest Tickets" />
        <Typography>Loading...</Typography>;
      </Box>
    );
  }

  const { data: tickets } = queryData;

  return (
    <Box component="section" className="overview__ticket" sx={{ mb: 5 }}>
      <OverviewSectionHeader title="Latest Tickets" />

      {queryData.length === 0 && (
        <Typography sx={{ p: 1, textAlign: 'center' }}>
          Ticket data is empty
        </Typography>
      )}

      {queryData.length > 0 && (
        <>
          <Grid container className="overview__list" spacing={2} sx={{ mb: 2 }}>
            {tickets.map((ticket) => (
              <Grid item xs={12} md={6} key={ticket._id}>
                <TicketCard ticket={ticket} showDownloadBtn />
              </Grid>
            ))}
          </Grid>

          <Box className="overview__action">
            <Link component={RouterLink} to="../ticket">
              View more
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OverviewTicket;
