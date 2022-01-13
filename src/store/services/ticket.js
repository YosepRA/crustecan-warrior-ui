import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_ENDPOINT } = import.meta.env;

const ticketApi = createApi({
  reducerPath: 'ticket',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_ENDPOINT}/ticket` }),
  endpoints: (builder) => ({
    getTicketDetails: builder.query({
      query: ({ ticketId }) => `/${ticketId}`,
    }),
  }),
});

export const { useGetTicketDetailsQuery } = ticketApi;

export default ticketApi;
