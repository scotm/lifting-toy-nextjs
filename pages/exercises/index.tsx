import * as React from "react";
import ExerciseList from "../../components/ExerciseList";
import ExerciseListHeader from "../../components/ExerciseListHeader";
import Layout from "../../components/PageLayout/Layout";
import { useGetExercisesQuery } from "../../services/exercise";

export interface IShowExercisesProps {}

export default function ShowExercises(props: IShowExercisesProps) {
  // The search parameters state
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");

  // API call effect
  const { data, error, isLoading } = useGetExercisesQuery({
    category: category,
    search: search,
  });

  return (
    <Layout title="Exercise Picker">
      {error ? (
        <>Oh no, there was an error:</>
      ) : isLoading ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : data ? (
        <>
          <ExerciseListHeader
            category={category}
            setCategory={setCategory}
            setSearch={setSearch}
          />
          <ExerciseList exercises={data} />
        </>
      ) : null}
    </Layout>
  );
}
