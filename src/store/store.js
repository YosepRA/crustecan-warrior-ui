import { configureStore } from '@reduxjs/toolkit';

import fixtureApi from './services/fixture.js';
import userReducer from './user/userSlice.js';

const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fixtureApi.middleware),
});

export default store;
