import React from 'react';
import { FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import OrderEntry from './OrderEntry.jsx';

const TicketCheckoutSeat = function TicketCheckoutSeatComponent({
  fixture,
  formikProps: {
    values: { orders },
  },
}) {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('../payment');
  };

  return (
    <Box className="checkout__seat-selection">
      <Typography
        variant="h5"
        component="h1"
        className="checkout__title"
        sx={{ mb: 2 }}
      >
        Choose your seats
      </Typography>

      <Box component="section" sx={{ mb: 8 }} className="checkout__main">
        <FieldArray name="orders">
          {({ remove, push }) => (
            <Box>
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <OrderEntry
                    key={index}
                    seats={fixture.seats}
                    order={order}
                    index={index}
                    remove={remove}
                  />
                ))}

              <Button
                type="button"
                size="small"
                variant="contained"
                sx={{ display: 'block', mt: 2, mx: 'auto' }}
                onClick={() => push({ section: '', seatNumber: '' })}
              >
                Add More Seat
              </Button>
            </Box>
          )}
        </FieldArray>
      </Box>

      <Box
        component="section"
        className="checkout__control"
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNextPage}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default TicketCheckoutSeat;
