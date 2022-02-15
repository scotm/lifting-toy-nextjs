import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import * as React from "react";
import ExerciseAdditional from "./ExerciseAdditional";
import type { MyExercise } from "../types/ExerciseTypes";
import ReactMarkdown from "react-markdown";

export interface IExerciseListProps {
  exercises: MyExercise[];
  edit?: boolean;
  show_description?: boolean;
  exercise_onclick?: Function;
}

export default function ExerciseList(props: IExerciseListProps) {
  let { exercises, edit, show_description } = props;
  edit = edit === undefined ? true : edit;
  show_description = show_description === undefined ? true : edit;
  return (
    <>
      {exercises.length > 0 ? (
        exercises.map((e) => {
          return (
            <div key={e.id} className="p-4">
              <h3 className="text-3xl font-bold">
                {e.name}
                {edit ? (
                  <p className="float-right">
                    <Link href={`/exercises/edit/${e.id}`} passHref={true}>
                      <PencilAltIcon className="h-5 w-5 text-red-500" />
                    </Link>
                  </p>
                ) : (
                  <></>
                )}
              </h3>

              <div>
                {show_description ? (
                  <div>
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
        })
      ) : (
        <h5 className="p-11">No Matching Exercises Found</h5>
      )}
    </>
  );
}
