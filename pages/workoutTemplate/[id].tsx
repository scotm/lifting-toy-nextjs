import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchWorkoutTemplatebyID } from "../../api-services";
import Layout from "../../components/PageLayout/Layout";
import WorkoutTemplate from "../../components/WorkoutTemplate";
import parseID from "../../util/parseID";

export interface IWorkoutTemplateViewProps {}

export default function WorkoutTemplateView(props: IWorkoutTemplateViewProps) {
  const router = useRouter();
  const { data: template } = useQuery(
    ["workouttemplate", parseID(router.query.id)],
    () => fetchWorkoutTemplatebyID(parseID(router.query.id))
  );
  if (!template) {
    return null;
  }
  return (
    <Layout title={template.name}>
      <div className="grid grid-cols-2">
        <WorkoutTemplate template={template}></WorkoutTemplate>
        <button className="col-span-1 m-6 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400">
          Let&apos;s lift!
        </button>
      </div>
    </Layout>
  );
}
