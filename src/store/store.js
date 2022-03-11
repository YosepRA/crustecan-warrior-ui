import { configureStore } from '@reduxjs/toolkit';

import fixtureApi from './fixture/service.js';
import ticketApi from './ticket/service.js';
import dashboardApi from './dashboard/service.js';
import userReducer from './user/slice.js';
import checkoutReducer from './checkout/slice.js';

const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    user: userReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fixtureApi.middleware,
      ticketApi.middleware,
      dashboardApi.middleware,
    ),
});

export default store;
