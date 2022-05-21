import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { useGetTicketListQuery } from '../../store/dashboard/service.js';
import TicketCard from '../ticket/TicketCard.jsx';
import withSearchParams from '../withSearchParams.jsx';

const TicketList = function TicketListComponent({ search }) {
  const queryArguments = {
    latest: search.latest || false,
    page: search.page,
  };
  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useGetTicketListQuery(queryArguments);

  if (isLoading || isFetching) {
    return <Typography>Loading...</Typography>;
  }

  if (queryData.length === 0) {
    return (
      <Typography sx={{ p: 1, textAlign: 'center' }}>
        Ticket data is empty
      </Typography>
    );
  }

  const { data: tickets, totalPages } = queryData;

  return (
    <Box component="section" className="ticket-list">
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        className="ticket-list__list"
        sx={{ mb: 5 }}
      >
        {tickets.map((ticket) => (
          <Grid item xs={12} md={6} key={ticket._id}>
            <TicketCard ticket={ticket} showDownloadBtn />
          </Grid>
        ))}
      </Grid>

      <Pagination
        page={search.page}
        count={totalPages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`?page=${item.page}`}
            {...item}
          />
        )}
        sx={{ '.MuiPagination-ul': { justifyContent: 'center' } }}
        className="ticket-list__pagination"
      />
    </Box>
  );
};

export default withSearchParams(TicketList);
