import { apiSlice } from '../api/apiSlice';

const badgeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBadges: builder.query({
      query: () => `badges`,
      providesTags: ['Badges'],
    }),

    addBadge: builder.mutation({
      query: (body) => ({
        url: `badges`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Badges'],
    }),
  }),
});

export const { useGetBadgesQuery, useAddBadgeMutation } = badgeApi;
