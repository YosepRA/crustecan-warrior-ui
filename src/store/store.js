import { configureStore } from '@reduxjs/toolkit';

import fixtureApi from './services/fixture.js';
import ticketFixtureApi from './services/ticket-fixture.js';
import userReducer from './user/user-slice.js';
import checkoutReducer from './checkout/checkout-slice.js';

const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    [ticketFixtureApi.reducerPath]: ticketFixtureApi.reducer,
    user: userReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fixtureApi.middleware,
      ticketFixtureApi.middleware,
    ),
});

export default store;
