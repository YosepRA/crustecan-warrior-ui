import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_ENDPOINT } = import.meta.env;

const ticketFixtureApi = createApi({
  reducerPath: 'ticketFixture',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_ENDPOINT}/fixture` }),
  endpoints: (builder) => ({
    getTicketFixtureList: builder.query({
      query: ({ increment }) => `?increment=${increment}&homeOnly=true`,
    }),
    getTicketFixtureDetails: builder.query({
      query: ({ fixtureId }) => `/${fixtureId}?includeSeat=true`,
    }),
  }),
});

export const { useGetTicketFixtureListQuery, useGetTicketFixtureDetailsQuery } =
  ticketFixtureApi;

export default ticketFixtureApi;
