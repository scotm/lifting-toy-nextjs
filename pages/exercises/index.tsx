import { useState } from "react";
import ExerciseList from "../../components/ExerciseList";
import ExerciseListHeader from "../../components/ExerciseListHeader";
import Layout from "../../components/PageLayout/Layout";

export interface IShowExercisesProps {}

export default function ShowExercises(props: IShowExercisesProps) {
  // The search parameters state
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <Layout title="Exercise Picker">
      <ExerciseListHeader
        category={category}
        search={search}
        setCategory={setCategory}
        setSearch={setSearch}
      />
      <ExerciseList category={category} search={search} />
    </Layout>
  );
}
