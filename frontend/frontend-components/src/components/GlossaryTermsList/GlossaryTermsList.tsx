import React from "react";
import { GlossaryTerm } from "../..";
import styles from "./GlossaryTermsList.module.css";

interface GlossaryTermsListProps {
  glossaryTerms: GlossaryTerm[];
  linkTo?: string;
}

export const GlossaryTermsList = (props: GlossaryTermsListProps) => {
  const { glossaryTerms, linkTo = "" } = props;
  return (
    <div className={styles.glossary_terms_list}>
      {glossaryTerms.map((term) => {
        return (
          <span
            key={term.id}
            className="mention"
            style={{ backgroundColor: term.color }}
          >
            <a href={`${linkTo}#glossary/${term.id}`}>
              <span>{term.title}</span>
            </a>
          </span>
        );
      })}
    </div>
  );
};
