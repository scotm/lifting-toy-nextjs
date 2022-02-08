// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Exercise } from "@prisma/client";

// Define a service using a base URL and expected endpoints

interface getExercisesArgs {
  category?: string;
  search?: string;
}

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getExerciseById: builder.query<Exercise, string>({
      query: (id) => `exercises/${id}`,
    }),
    getExercises: builder.query<Array<Exercise>, getExercisesArgs>({
      //   query: (args) => { return `exercises/`},
      query: ({ category, search }) => {
        const q = `exercises?category=${category}${
          search !== "" ? `&search=${search}` : ""
        }`;
        console.log(q);
        return q;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExercisesQuery } = exerciseApi;
