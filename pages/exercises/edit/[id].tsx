import Layout from "../../../components/PageLayout/Layout";
import { useRouter } from "next/router";
import ExerciseEditForm from "../../../components/ExerciseEditForm";
import parseID from "../../../util/parseID";

export default function EditExercise() {
  const router = useRouter();

  return (
    <Layout title="Editing ">
      <ExerciseEditForm id={parseID(router.query.id)} />
    </Layout>
  );
}
