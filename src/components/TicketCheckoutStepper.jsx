/* eslint-disable function-paren-newline */

import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const stepperModel = [
  { route: '/ticket/checkout/:id/seat-selection', label: 'Seat Selection' },
  { route: '/ticket/checkout/:id/payment', label: 'Payment' },
];

const TicketCheckoutStepper = function TicketCheckoutStepperComponent() {
  const { pathname } = useLocation();

  const activeStep = stepperModel.findIndex(({ route }) =>
    matchPath(route, pathname),
  );

  return (
    <Box sx={{ width: 1, my: 5 }} className="checkout__steps">
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepperModel.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TicketCheckoutStepper;
