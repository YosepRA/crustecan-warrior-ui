import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetFixtureListQuery } from '../store/services/fixture.js';
import FixtureCard from '../components/FixtureCard.jsx';
import withSearchParams from '../components/withSearchParams.jsx';

const LoadMoreButton = function LoadMoreButtonComponent({
  fixtures,
  isLoading,
  isFetching,
  handleLoadMore,
}) {
  // Choose load more button text based on a few conditions.
  let loadMoreText = '';

  if (isLoading || isFetching) loadMoreText = 'Loading';
  else if (fixtures.length === fixtures.total) loadMoreText = 'No More Data';
  else loadMoreText = 'Load More';

  return (
    <Button
      variant="contained"
      onClick={handleLoadMore}
      disabled={isLoading || isFetching || fixtures.length === fixtures.total}
      sx={{ color: 'primary.contrastText' }}
      className="fixtures__load-more-btn"
    >
      {isFetching && (
        <CircularProgress color="inherit" size="20px" sx={{ mr: 0.5 }} />
      )}
      {loadMoreText}
    </Button>
  );
};

/* ========== Main component ========== */

const TicketFixtureList = function TicketFixtureListComponent({
  search,
  handleSearchChange,
}) {
  const queryArguments = {
    increment: search.increment || 1,
    includeSeat: search.includeSeat || false,
    homeOnly: search.homeOnly || true,
  };
  const {
    data: fixtures,
    isLoading,
    isFetching,
  } = useGetFixtureListQuery(queryArguments);

  /* ========== Event handlers ========== */

  const handleLoadMore = () => {
    handleSearchChange({
      ...search,
      increment: search.increment ? search.increment + 1 : 2,
    });
  };

  /* ========== Utilities ========== */

  const fixtureCards = fixtures?.data.map((fixture) => (
    <FixtureCard key={fixture._id} fixture={fixture} buyButton />
  ));

  /* ========== Render ========== */

  if (isLoading) {
    return <Typography variant="h3">Loading</Typography>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ mb: 1, textAlign: 'center' }}
        className="ticket-fixture__title"
      >
        Buy Ticket
      </Typography>

      <Box component="section" sx={{ mb: 3 }} className="ticket-fixture__list">
        {fixtureCards}
      </Box>

      <LoadMoreButton
        fixtures={fixtures}
        isLoading={isLoading}
        isFetching={isFetching}
        handleLoadMore={handleLoadMore}
      />
    </Container>
  );
};

export default withSearchParams(TicketFixtureList);
