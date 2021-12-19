import { configureStore } from '@reduxjs/toolkit';

import fixtureApi from './services/fixture.js';

const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fixtureApi.middleware),
});

export default store;
