import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useGetTransactionListQuery } from '../../store/dashboard/service.js';
import TransactionCard from './TransactionCard.jsx';

const OverviewTransaction = function OverviewTransactionComponent() {
  const { data: queryData, isLoading } = useGetTransactionListQuery({
    latest: true,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!queryData) {
    return <Typography>Data is not found.</Typography>;
  }

  const { data: transactions } = queryData;

  return (
    <Box component="section" className="overview__transaction" sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        className="overview__title"
        sx={{ mb: 1, color: 'text.secondary' }}
      >
        Latest Transactions
      </Typography>

      <Box className="overview__list" sx={{ mb: 2 }}>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction._id} transaction={transaction} />
        ))}
      </Box>

      <Box className="overview__action">
        <Link component={RouterLink} to="../transaction">
          View more
        </Link>
      </Box>
    </Box>
  );
};

export default OverviewTransaction;
