import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  Link as RouterLink,
} from 'react-router-dom';
import { Formik } from 'formik';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import TicketCheckoutStepper from '../components/TicketCheckoutStepper.jsx';
import TicketCheckoutFixtureInfo from '../components/TicketCheckoutFixtureInfo.jsx';
import TicketCheckoutSeat from '../components/TicketCheckoutSeat.jsx';
import TicketCheckoutPayment from '../components/TicketCheckoutPayment.jsx';
import { useGetFixtureDetailsQuery } from '../store/fixture/service.js';

const initialValues = {
  orders: [
    {
      section: '',
      seatNumber: '',
    },
  ],
};

const TicketCheckout = function TicketCheckoutComponent() {
  const { fixtureId } = useParams();
  const queryArguments = { fixtureId, includeSeat: true };
  const { data: fixture, isLoading } =
    useGetFixtureDetailsQuery(queryArguments);

  if (isLoading) {
    return (
      <CircularProgress
        className="checkout__loading-spinner"
        sx={{ display: 'block', mx: 'auto', my: 2 }}
      />
    );
  }

  if (fixture.data === null) {
    return (
      <Stack className="checkout__not-found" alignItems="center">
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
          Fixture data is not found.
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          to="/ticket/fixtures"
        >
          Go to fixture list
        </Button>
      </Stack>
    );
  }

  return (
    <Container sx={{ maxWidth: { sm: 668 }, pt: 1 }} className="checkout">
      <TicketCheckoutStepper />

      <TicketCheckoutFixtureInfo fixture={fixture.data} />

      <Formik initialValues={initialValues}>
        {(formikProps) => (
          <Routes>
            <Route
              path="seat-selection"
              element={
                <TicketCheckoutSeat
                  fixture={fixture.data}
                  formikProps={formikProps}
                />
              }
            />
            <Route
              path="payment"
              element={<TicketCheckoutPayment formikProps={formikProps} />}
            />
            <Route path="*" element={<Navigate to="seat-selection" />} />
          </Routes>
        )}
      </Formik>
    </Container>
  );
};

export default TicketCheckout;
