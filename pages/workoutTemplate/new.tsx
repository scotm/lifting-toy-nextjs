import { WorkoutTemplateForm } from "../../components/Forms/WorkoutTemplateForm";
import Layout from "../../components/PageLayout/Layout";

export default function WorkoutTemplateCreate() {
  return (
    <Layout title="Write a New Workout Template">
      <WorkoutTemplateForm />
    </Layout>
  );
}
