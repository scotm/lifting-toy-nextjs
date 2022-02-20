import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchExerciseByID } from "../../api-services";
import Exercise from "../../components/Exercise";
import Layout from "../../components/PageLayout/Layout";
import parseID from "../../util/parseID";

export default function ExerciseView() {
  const router = useRouter();
  const id = parseID(router.query.id);
  const { data: exercise } = useQuery(["exercise", id], () =>
    fetchExerciseByID(id)
  );
  if (exercise === undefined) {
    return null;
  }
  return (
    <Layout title={exercise.name}>
      <Exercise exercise={exercise} edit={true} show_description={true} />
    </Layout>
  );
}
