import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetFixtureListQuery } from '../store/fixture/service.js';
import PageTitleBanner from '../components/PageTitleBanner.jsx';
import FixtureCard from '../components/FixtureCard.jsx';
import NoData from '../components/NoData.jsx';
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

  if (isLoading || isFetching) loadMoreText = 'Loading';
  else if (fixtures.length === fixtures.total) loadMoreText = 'No More Data';
  else loadMoreText = 'Load More';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </Box>
  );
};

/* ========== Main component ========== */

const FixtureList = function FixtureListComponent({
  search,
  handleSearchChange,
}) {
  const queryArguments = {
    increment: search.increment || 1,
    includeSeat: search.includeSeat || false,
    homeOnly: search.homeOnly || false,
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
        <FixtureCard key={fixture._id} fixture={fixture} />
      ));

      return (
        <Box
          key={monthYearString}
          className={`fixtures__list-month fixtures__list-month--${monthYearString
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

  return (
    <>
      <PageTitleBanner title="Fixtures" />

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />
      ) : (
        <Container sx={{ maxWidth: { sm: 668 } }}>
          <Box component="section" sx={{ mb: 4 }} className="fixtures__list">
            {fixtureList.length === 0 ? <NoData /> : fixtureList}
          </Box>

          <LoadMoreButton
            fixtures={fixtures}
            isLoading={isLoading}
            isFetching={isFetching}
            handleLoadMore={handleLoadMore}
          />
        </Container>
      )}
    </>
  );
};

export default withSearchParams(FixtureList);
