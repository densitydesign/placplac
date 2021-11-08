import React from "react";
import { GlossaryTerm } from "../..";
import styles from "./GlossaryTermsList.module.css";

interface GlossaryTermsListProps {
  glossaryTerms: GlossaryTerm[];
  
}
export const GlossaryTermsList = (props: GlossaryTermsListProps) => {
  const { glossaryTerms } = props;
  return (
    <div className={styles.glossary_terms_list}>
      {glossaryTerms.map((term) => {
        return (
          <span key={term.id} className="mention" style={{ display: "flex" }}>
            <a href={`#glossary/${term.id}`}>
              <span style={{ backgroundColor: term.color }}>{term.title}</span>
            </a>
          </span>
        );
      })}
    </div>
  );
};
