import * as React from "react";

interface NamedObject {
  id?: number;
  name: string;
}

export interface IExerciseAdditionalProps {
  precursor: string;
  named: Array<NamedObject> | undefined;
}

export default function ExerciseAdditional(props: IExerciseAdditionalProps) {
  return (
    <div>
      {props.named !== undefined ? (
        <p>
          {props.named.length > 0 ? <strong>{props.precursor}</strong> : ""}
          {props.named.map((n: NamedObject) => n.name).join(", ")}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
