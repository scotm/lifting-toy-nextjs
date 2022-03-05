import Layout from "../../../components/PageLayout/Layout";
import { useRouter } from "next/router";
import { ExerciseEditForm } from "../../../components/Forms/ExerciseEditForm";
import parseID from "../../../util/parseID";
import { useState } from "react";

export default function EditExercise() {
  const router = useRouter();
  const [title, setTitle] = useState("Editing ");
  return (
    <Layout title={title}>
      <ExerciseEditForm id={parseID(router.query.id)} />
    </Layout>
  );
}
