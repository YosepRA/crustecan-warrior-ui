import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { createCheckoutSession } from '../store/checkout/checkout-slice.js';

const paymentOptionModel = [
  { label: 'Credit Card', icon: CreditCardIcon, value: 'credit-card' },
  // {
  //   label: 'Digital Wallet',
  //   icon: AccountBalanceWalletIcon,
  //   value: 'digital-wallet',
  // },
  // {
  //   label: 'PayPal',
  //   icon: AccountBalanceWalletIcon,
  //   value: 'paypal',
  // },
  // {
  //   label: 'AliPay',
  //   icon: AccountBalanceWalletIcon,
  //   value: 'alipay',
  // },
  // {
  //   label: 'Bank Transfer',
  //   icon: AccountBalanceWalletIcon,
  //   value: 'bank-transfer',
  // },
];

const PaymentButton = function PaymentButtonComponent({
  active,
  handleChange,
  model: { label, icon: Icon, value },
}) {
  const checked = active === value;

  return (
    <Grid item>
      <Box
        sx={[
          {
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 160,
            height: 80,
            border: 3,
            borderColor: 'grey.500',
            borderRadius: 1,
            color: 'text.primary',
          },
          checked && {
            backgroundColor: 'primary.main',
            borderColor: 'primary.main',
            color: 'white',
          },
        ]}
        onClick={() => handleChange(value)}
      >
        <Icon sx={{ display: 'block', mb: 0.5, fontSize: '2rem' }} />

        <Typography sx={{ fontSize: '1rem' }}>{label}</Typography>
      </Box>
    </Grid>
  );
};

const TicketCheckoutPayment = function TicketCheckoutPaymentComponent({
  formikProps: {
    values: { orders },
  },
}) {
  const [paymentMethod, setPaymentMethod] = useState(
    paymentOptionModel[0].value,
  );
  const { loading, sessionURL } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const { fixtureId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionURL !== '') window.location.replace(sessionURL);
  }, [sessionURL]);

  const handleChange = (value) => {
    setPaymentMethod(value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    const payload = { fixtureId, orders };

    dispatch(createCheckoutSession(payload));

    console.log(sessionURL);
  };

  let loadMoreText = '';

  if (loading) loadMoreText = 'Submitting';
  else loadMoreText = 'Checkout';

  return (
    <Box className="checkout__seat-selection">
      <Typography
        variant="h5"
        component="h1"
        className="checkout__title"
        sx={{ mb: 2 }}
      >
        Choose your Payment Method
      </Typography>

      <Grid
        container
        spacing={1}
        component="section"
        sx={{ mb: 8 }}
        className="checkout__main"
      >
        {paymentOptionModel.map((payment) => (
          <PaymentButton
            key={payment.label}
            active={paymentMethod}
            handleChange={handleChange}
            model={payment}
          />
        ))}
      </Grid>

      <Box
        component="section"
        className="checkout__control"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          type="button"
          variant="outlined"
          color="neutral"
          size="large"
          onClick={handleGoBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading && (
            <CircularProgress color="inherit" size="20px" sx={{ mr: 0.5 }} />
          )}
          {loadMoreText}
        </Button>
      </Box>
    </Box>
  );
};

export default TicketCheckoutPayment;
