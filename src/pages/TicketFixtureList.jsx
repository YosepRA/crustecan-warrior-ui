import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetFixtureListQuery } from '../store/fixture/service.js';
import PageTitleBanner from '../components/PageTitleBanner.jsx';
import FixtureCard from '../components/FixtureCard.jsx';
import withSearchParams from '../components/withSearchParams.jsx';
import { sortFixturesByMonth } from '../utilities/helpers.js';

const LoadMoreButton = function LoadMoreButtonComponent({
  fixtures,
  isLoading,
  isFetching,
  handleLoadMore,
}) {
  // Choose load more button text based on a few conditions.
  let loadMoreText = '';

  if (isLoading || isFetching) loadMoreText = '';
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

  const fixturesByMonth = sortFixturesByMonth(fixtures);

  const fixtureList =
    fixturesByMonth &&
    Object.entries(fixturesByMonth).map(([monthYearString, fixtureArray]) => {
      const fixtureCards = fixtureArray.map((fixture) => (
        <FixtureCard key={fixture._id} fixture={fixture} buyButton />
      ));

      return (
        <Box
          key={monthYearString}
          className={`ticket-fixtures__list-month ticket-fixtures__list-month--${monthYearString
            .toLowerCase()
            .replace(' ', '-')}`}
          sx={{ ':not(:last-child)': { mb: 4 } }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {monthYearString}
          </Typography>

          <Box>{fixtureCards}</Box>
        </Box>
      );
    });

  /* ========== Render ========== */

  if (isLoading) {
    return <Typography variant="h3">Loading</Typography>;
  }

  return (
    <>
      <PageTitleBanner title="Buy Ticket" />

      <Container>
        <Box
          component="section"
          sx={{ mb: 3 }}
          className="ticket-fixture__list"
        >
          {fixtureList}
        </Box>
        <LoadMoreButton
          fixtures={fixtures}
          isLoading={isLoading}
          isFetching={isFetching}
          handleLoadMore={handleLoadMore}
        />
      </Container>
    </>
  );
};

export default withSearchParams(TicketFixtureList);
