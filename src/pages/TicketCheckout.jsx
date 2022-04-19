import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

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

  return (
    <Container sx={{ maxWidth: { sm: 668 }, pt: 1 }} className="checkout">
      <TicketCheckoutStepper />

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default TicketCheckout;
