import React from 'react';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';

import { useCancelTransactionMutation } from '../../store/dashboard/service.js';

const StatusChip = function StatusChipComponent({ status }) {
  switch (status) {
    case 'open':
      return <Chip label="open" color="info" />;

    case 'cancelled':
      return <Chip label="cancelled" color="error" />;

    case 'complete':
      return <Chip label="complete" color="success" />;

    default:
      return <Chip label="unknown" />;
  }
};

const TransactionCard = function TransactionCardComponent({ transaction }) {
  const [cancelOrder, { isLoading }] = useCancelTransactionMutation();

  const {
    _id,
    status,
    fixture: { date: fixtureDate, homeTeam, awayTeam, event },
    created: orderDate,
    orders,
    stripeSessionUrl,
  } = transaction;
  const orderDateString = format(new Date(orderDate), 'MM/dd/yyyy');
  const fixtureDateString = format(new Date(fixtureDate), 'MM/dd/yyyy');
  const seatOrdersString = orders
    .map((order) => `${order.section}-${order.seatNumber}`)
    .join(', ');

  const handleCancel = () => {
    cancelOrder(_id);
  };

  return (
    <Paper
      component="article"
      className="transaction"
      sx={{ p: 2, ':not(:last-child)': { mb: 1 } }}
    >
      <Box
        className="transaction__metadata"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          py: 1,
        }}
      >
        <Typography>Order Date: {orderDateString}</Typography>
        <StatusChip status={status} />
      </Box>

      <Box className="transaction__fixture" sx={{ mb: 3 }}>
        <Box className="transaction__event" sx={{ mb: 1 }}>
          <Typography>{event}</Typography>
        </Box>

        <Box className="transaction__date" sx={{ mb: 1 }}>
          <Typography>{fixtureDateString}</Typography>
        </Box>

        <Box
          className="transaction__main-info"
          sx={{ py: 2, textAlign: 'center' }}
        >
          <Typography
            className="transaction__teams"
            sx={{ mb: 1, fontSize: '1.1rem' }}
          >
            {homeTeam} vs {awayTeam}
          </Typography>

          <Typography
            className="transaction__seats"
            sx={{ color: 'text.secondary' }}
          >
            Seats: {seatOrdersString}
          </Typography>
        </Box>
      </Box>

      {status === 'open' && (
        <Stack className="transaction__action" direction="row" spacing={2}>
          <Button
            href={stripeSessionUrl}
            target="_blank"
            rel="noreferrer"
            startIcon={<PaymentIcon />}
            variant="outlined"
          >
            Pay
          </Button>

          <Button
            className="transaction__cancel"
            aria-label="cancel"
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
            disabled={isLoading}
            onClick={handleCancel}
          >
            {isLoading ? 'Cancelling' : 'Cancel Order'}
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default TransactionCard;
