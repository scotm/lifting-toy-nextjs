// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Exercise, Language, Licence, Muscles } from "@prisma/client";

// Define a service using a base URL and expected endpoints

interface getExercisesArgs {
  category?: string;
  search?: string;
}

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getExerciseById: builder.query<
      Exercise,
      string | string[] | undefined | number
    >({
      query: (id) => `exercises/${id}`,
    }),
    getExercises: builder.query<Array<Exercise>, getExercisesArgs>({
      //   query: (args) => { return `exercises/`},
      query: ({ category, search }) => {
        return `exercises?category=${category}${
          search !== "" ? `&search=${search}` : ""
        }`;
      },
    }),
    getCategories: builder.query<Array<Category>, void>({
      query: () => `categories`,
    }),
    getMuscles: builder.query<Array<Muscles>, void>({
      query: () => `muscles`,
    }),
    getLicences: builder.query<Array<Licence>, void>({
      query: () => `licences`,
    }),
    getLanguages: builder.query<Array<Language>, void>({
      query: () => `languages`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetExercisesQuery,
  useGetExerciseByIdQuery,
  useGetCategoriesQuery,
  useGetLicencesQuery,
  useGetMusclesQuery,
  useGetLanguagesQuery,
} = exerciseApi;
