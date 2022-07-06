import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { fetchExercises } from "../api-services";
import Exercise from "./Exercise";

export interface IExerciseListProps {
  edit?: boolean;
  show_description?: boolean;
  exercise_onclick?: Function;
  category: string;
  search: string;
}

export default function ExerciseList(props: IExerciseListProps) {
  let { edit, show_description, category, search } = props;
  const {
    data: exercises,
    error,
    isLoading,
  } = useQuery(["exercises_list", category, search], () =>
    fetchExercises(category, search)
  );
  const usercontext = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>There was an error getting the list of exercises.</div>;
  }

  if (!exercises) return <div></div>;

  // If you're not logged in, you shouldn't get to edit.
  if (!usercontext.user) {
    edit = false;
  }

  edit = edit === undefined ? true : edit;
  show_description = show_description === undefined ? true : show_description;
  return (
    <>
      {exercises.length > 0 ? (
        exercises.map((e) => {
          return (
            <Exercise
              edit={edit}
              show_description={show_description}
              key={e.id}
              exercise={e}
              link_to={true}
            />
          );
        })
      ) : (
        <h5 className="p-11">No Matching Exercises Found</h5>
      )}
    </>
  );
}
