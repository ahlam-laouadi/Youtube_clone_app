import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const youtubeApiHeaders = {
  'X-RapidAPI-Key': 'c46ff3ae35msh2d8ea35e9dc14b8p1bee04jsnf980dfc18795',
  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
};
const createRequest = (url) => ({ url, headers: youtubeApiHeaders });

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-v31.p.rapidapi.com',
  }),
  endpoints: (builder) => ({
    getChannel: builder.query({
      query: (id) => createRequest(`/channels?part=snippet&id=${id}`),
    }),

    getChannelVids: builder.query({
      query: (id) =>
        createRequest(`/search?channelId=${id}&part=snippet%2Cid&order=date`),
    }),

    getFeed: builder.query({
      query: (term) => createRequest(`/search?part=snippet&q=${term}`),
    }),

    getVidDetails: builder.query({
      query: (id) => createRequest(`/videos?part=snippet,statistics&id=${id}`),
    }),

    getSimilar: builder.query({
      query: (id) =>
        createRequest(`/search?part=snippet&relatedToVideoId=${id}&type=video`),
    }),
  }),
});

export const {
  useLazyGetChannelQuery,
  useLazyGetChannelVidsQuery,
  useLazyGetFeedQuery,
  useLazyGetVidDetailsQuery,
  useLazyGetSimilarQuery,
} = youtubeApi;
