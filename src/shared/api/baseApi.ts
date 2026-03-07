import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_BASE_URL = 'https://dummyjson.com'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
})
