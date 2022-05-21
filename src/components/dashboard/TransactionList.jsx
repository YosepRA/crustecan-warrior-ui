import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { useGetTransactionListQuery } from '../../store/dashboard/service.js';
import TransactionCard from './TransactionCard.jsx';
import withSearchParams from '../withSearchParams.jsx';

const TransactionList = function TransactionListComponent({ search }) {
  const queryArguments = {
    latest: search.latest || false,
    page: search.page,
  };
  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useGetTransactionListQuery(queryArguments);

  if (isLoading || isFetching) {
    return <Typography>Loading...</Typography>;
  }

  if (queryData.length === 0) {
    return (
      <Typography sx={{ p: 1, textAlign: 'center' }}>
        Transaction data is empty
      </Typography>
    );
  }

  const { data: transactions, totalPages } = queryData;

  return (
    <Box component="section" className="transaction-list">
      <Grid
        container
        spacing={2}
        className="transaction-list__list"
        sx={{ mb: 5 }}
      >
        {transactions.map((transaction) => (
          <Grid item xs={12} md={6} key={transaction._id}>
            <TransactionCard transaction={transaction} />
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
        className="transaction-list__pagination"
      />
    </Box>
  );
};

export default withSearchParams(TransactionList);
