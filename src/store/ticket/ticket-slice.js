import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTicketDetails as getTicketDetailsAPI } from './ticket-api.js';

const initialState = {
  loading: false,
  data: null,
};

/* ========== Async Thunks ========== */

const getTicketDetails = createAsyncThunk(
  'ticket/getTicketDetailsStatus',
  async (ticketId) => {
    const response = await getTicketDetailsAPI(ticketId);

    return response;
  },
);

/* ========== Slice ========== */

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketDetails.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.data = data;
      })
      .addCase(getTicketDetails.rejected, (state) => {
        state.loading = false;
        state.data = null;
      });
  },
});

export { getTicketDetails };

export default ticketSlice.reducer;
