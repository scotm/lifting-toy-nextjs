import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import ExerciseList from "../../components/ExerciseList";
import ExerciseListHeader from "../../components/ExerciseListHeader";
import Layout from "../../components/Layout";

export interface IShowExercisesProps {}

interface ErrorMessage {
  message: string;
}

export default function ShowExercises(props: IShowExercisesProps) {
  // The search parameters state
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // API call state
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<ErrorMessage | undefined>(undefined);
  const [items, setItems] = useState(new Array());

  // Hook: Force a call if category or search changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `/api/exercises?category=${category}${
          search !== "" ? "&search=" + search : ""
        }`
      );

      // TODO: Error handling

      // Chuck the result into the items
      if (Array.isArray(result.data)) {
        setItems(result.data);
        setLoaded(true);
      }
    };

    fetchData();
  }, [category, search]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout title="Exercise Picker">
        <div className="container p-10">
          <ExerciseListHeader
            category={category}
            setCategory={setCategory}
            setSearch={setSearch}
          />
          <ExerciseList items={items} />
        </div>
      </Layout>
    );
  }
}

// <Accordion>
// </Accordion>
