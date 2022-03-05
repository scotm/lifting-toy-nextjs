import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ExerciseFromIDReturnType } from "../pages/api/api-types";
import ExerciseAdditional from "./ExerciseAdditional";

export interface IExerciseComponentProps {
  exercise: ExerciseFromIDReturnType;
  edit?: boolean;
  show_description?: boolean;
  link_to?: boolean;
}

export default function ExerciseComponent(props: IExerciseComponentProps) {
  const { exercise: e, edit, show_description, link_to } = props;
  if (!e) return null;
  return (
    <div key={e.id} className="p-4">
      {link_to ? (
        <Link href={`/exercises/${e.id}`} passHref={true}>
          <a>
            <h3 className="text-3xl font-bold">{e.name}</h3>
          </a>
        </Link>
      ) : (
        <h3 className="text-3xl font-bold">{e.name}</h3>
      )}

      {edit ? (
        <p className="float-right">
          <Link href={`/exercises/edit/${e.id}`} passHref={true}>
            <a>
              <PencilAltIcon className="h-8 w-8 text-red-500" />
            </a>
          </Link>
        </p>
      ) : (
        <></>
      )}
      <div>
        {show_description ? (
          <div className="exercise-description">
            <ReactMarkdown>{e.description}</ReactMarkdown>
          </div>
        ) : (
          <></>
        )}
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <ExerciseAdditional
            precursor="Muscles Used: "
            named={e.muscles}
          ></ExerciseAdditional>
          <ExerciseAdditional
            precursor="Equipment: "
            named={e.equipment}
          ></ExerciseAdditional>
          <ExerciseAdditional
            precursor="Author: "
            named={
              e.license_author !== undefined
                ? [{ name: e.license_author }]
                : undefined
            }
          ></ExerciseAdditional>
        </div>
      </div>
    </div>
  );
}
