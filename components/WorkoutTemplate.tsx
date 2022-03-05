import * as React from "react";
import { WorkoutTemplateReturnType } from "../pages/api/api-types";

export interface IWorkoutTemplateProps {
  template: WorkoutTemplateReturnType;
}

export default function WorkoutTemplate(props: IWorkoutTemplateProps) {
  return (
    <div className="p-2">
      {props.template.pieces.map((e) => {
        return (
          <section key={e.id}>
            <div className="font-semibold">{e.exercise.name}</div>
            <div>
              {e.rep_pair.length} sets:{" "}
              {e.rep_pair
                .map((f) => {
                  return f.reps;
                })
                .join(", ")}
            </div>
          </section>
        );
      })}
    </div>
  );
}
