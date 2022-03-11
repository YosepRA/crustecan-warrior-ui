import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCheckoutSession as createCheckoutSessionAPI } from './api.js';

const initialState = {
  loading: false,
  sessionURL: '',
};

/* ========== Async Thunks ========== */

const createCheckoutSession = createAsyncThunk(
  'checkout/createCheckoutSessionStatus',
  async (payload) => {
    const response = await createCheckoutSessionAPI(payload);

    return response;
  },
);

/* ========== Slice ========== */

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCheckoutSession.fulfilled,
        (state, { payload: { url } }) => {
          state.loading = false;
          state.sessionURL = url;
        },
      )
      .addCase(createCheckoutSession.rejected, (state) => {
        state.loading = false;
      });
  },
});

export { createCheckoutSession };

export default checkoutSlice.reducer;
