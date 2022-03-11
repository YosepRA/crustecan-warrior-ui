import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_ENDPOINT } = import.meta.env;

const dashboardApi = createApi({
  reducerPath: 'dashboard',
  baseQuery: fetchBaseQuery({
    baseUrl: `${VITE_API_ENDPOINT}/user`,
    credentials: 'include',
  }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getTicketList: builder.query({
      query: ({ latest, page }) =>
        `/ticket?latest=${latest}${page !== undefined ? `&page=${page}` : ''}`,
    }),
    getTransactionList: builder.query({
      query: ({ latest, page }) =>
        `/transaction?latest=${latest}${
          page !== undefined ? `&page=${page}` : ''
        }`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((transaction) => ({
                type: 'Transactions',
                id: transaction._id,
              })),
              'Transactions',
            ]
          : ['Transactions'],
    }),
    cancelTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Transactions', id }],
    }),
  }),
});

export const {
  useGetTicketListQuery,
  useGetTransactionListQuery,
  useCancelTransactionMutation,
} = dashboardApi;

export default dashboardApi;
