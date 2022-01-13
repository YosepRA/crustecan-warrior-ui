import { configureStore } from '@reduxjs/toolkit';

import fixtureApi from './services/fixture.js';
import userReducer from './user/user-slice.js';
import checkoutReducer from './checkout/checkout-slice.js';
import ticketReducer from './ticket/ticket-slice.js';

const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    user: userReducer,
    checkout: checkoutReducer,
    ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fixtureApi.middleware),
});

export default store;
