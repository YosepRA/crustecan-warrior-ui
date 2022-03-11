import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_ENDPOINT } = import.meta.env;

const fixtureApi = createApi({
  reducerPath: 'fixture',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_ENDPOINT}/fixture` }),
  endpoints: (builder) => ({
    getFixtureList: builder.query({
      query: ({ increment, includeSeat, homeOnly }) =>
        `?increment=${increment}&includeSeat=${includeSeat}&homeOnly=${homeOnly}`,
    }),
    getFixtureDetails: builder.query({
      query: ({ fixtureId, includeSeat }) =>
        `/${fixtureId}?includeSeat=${includeSeat}`,
    }),
  }),
});

export const { useGetFixtureListQuery, useGetFixtureDetailsQuery } = fixtureApi;

export default fixtureApi;
