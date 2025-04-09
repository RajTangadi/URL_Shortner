import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const urlApi = createApi({
  reducerPath: "urlApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/api/",
    baseUrl:`${import.meta.env.VITE_BACKEND_URL}/api/`,
    prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    }),
  tagTypes: ["Urls"],
  endpoints: (builder) => ({
    getUrls: builder.query({
      query: () => "urls",
      providesTags: ["Urls"],
    }),
    createShortUrl: builder.mutation({
      query: ({originalUrl,shortCode}) => ({
        url: "urls/shorten",
        method: "POST",
        body: { originalUrl,shortCode },
      }),
      invalidatesTags: ["Urls"],
    }),
  }),
});

export const { useGetUrlsQuery, useCreateShortUrlMutation } = urlApi;
