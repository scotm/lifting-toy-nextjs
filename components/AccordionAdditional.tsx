import * as React from "react";

interface NamedObject {
  id: number;
  name: string;
}

export interface IAccordionAdditionalProps {
  precursor: string;
  named: Array<NamedObject>;
}

export default function AccordionAdditional(props: IAccordionAdditionalProps) {
  return (
    <p>
      {props.named.length > 0 ? props.precursor : ""}
      {props.named.map((n: NamedObject) => n.name).join(", ")}
    </p>
  );
}
