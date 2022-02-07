import * as React from "react";

interface NamedObject {
  id: number;
  name: string;
}

export interface IExerciseAdditionalProps {
  precursor: string;
  named: Array<NamedObject>;
}

export default function ExerciseAdditional(props: IExerciseAdditionalProps) {
  return (
    <div>
      <p>
        {props.named.length > 0 ? <strong>{props.precursor}</strong> : ""}
        {props.named.map((n: NamedObject) => n.name).join(", ")}
      </p>
    </div>
  );
}
