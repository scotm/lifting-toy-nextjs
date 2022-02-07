import * as React from "react";
import ExerciseAdditional from "./ExerciseAdditional";
import { PencilAltIcon } from "@heroicons/react/outline";

export interface IExerciseListProps {
  items: any[];
}

export default function ExerciseList(props: IExerciseListProps) {
  const { items } = props;
  return (
    <>
      {items.map((e) => {
        return (
          <div key={e.id} className="p-4">
            <h3 className="text-3xl font-bold">{e.name}</h3>
            <p>
              <PencilAltIcon className="h-5 w-5 text-blue-500" />{" "}
            </p>
            <div>
              <div dangerouslySetInnerHTML={{ __html: e.description }}></div>
              <hr />
              <div className="grid grid-cols-2 gap-4">
                <ExerciseAdditional
                  precursor="Muscles Used: "
                  named={e.exercise_base.muscles}
                ></ExerciseAdditional>
                <ExerciseAdditional
                  precursor="Equipment: "
                  named={e.exercise_base.equipment}
                ></ExerciseAdditional>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
