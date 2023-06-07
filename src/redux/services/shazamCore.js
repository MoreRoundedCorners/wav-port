import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key\n": "7a003eb1b8mshdffbc98c0a998d4p1f330fjsn6c0bb905d78b",
//     "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//   },
// };

// fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "7a003eb1b8mshdffbc98c0a998d4p1f330fjsn6c0bb905d78b"
      );
      //   headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getTopCharts: builder.query({
      query: () => "charts/world",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongsByGenreQuery,
} = shazamCoreApi;
