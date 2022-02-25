import Link from "next/link";
import { useQuery } from "react-query";
import { fetchWorkoutTemplates } from "../api-services";

export interface ShowWorkoutTemplatesProps {
  className?: string
}

export default function ShowWorkoutTemplates(props: ShowWorkoutTemplatesProps) {
  const { data: templates } = useQuery("workouttemplates", fetchWorkoutTemplates);
  if (!templates) {
    return null;
  }

  return (
    <div {...props}>
      <h2 className="text-center text-3xl font-bold underline my-4">
        Workout Templates
      </h2>
      <p>
        <Link href={"/workoutTemplate/new"}>
          <a className="float-right rounded-xl bg-red-500 py-2 px-4 text-white shadow-xl transition duration-300 hover:bg-red-400">
            + Template
          </a>
        </Link>
      </p>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {templates.map((e) => {
          return (
            <div className="border-2 border-red-500 p-2" key={e.id}>
              <h3 className="text-center text-2xl font-bold">
                {e.name}
              </h3>
              <ul>
                {e.pieces.map((j) => (
                  <li key={j.exercise.id}>
                    {j.rep_pair.length} x {j.exercise.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
