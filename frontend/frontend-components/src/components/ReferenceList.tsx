import React from "react";
import { TextShow } from "../TextShow";
import { Reference } from "../types";
interface ReferenceListProps {
  references: Reference[];
}
export const ReferenceList = (props: ReferenceListProps) => {
  const { references } = props;
  return (
    <ul
      style={{ listStyleType: "decimal", margin: "0", padding: 0 }}
      id="referenceList"
    >
      {references.map((reference, index) => (
        <li
          key={reference.id}
          data-reference-id={reference.id}
          id={`reference${reference.id}`}
        >
          <TextShow text={reference.description} />
        </li>
      ))}
    </ul>
  );
};
