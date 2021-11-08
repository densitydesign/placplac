import classnames from "classnames";
import React, { ComponentType } from "react";
import { GlossaryTerm } from "..";
import { GlossaryTermsList } from "../components/GlossaryTermsList";
import { GlossaryCategory } from "../types";
import styles from "./GlossaryShow.module.css";

interface GlossaryShowProps {
  glossaryCategories: GlossaryCategory[];
  glossaryTerms: GlossaryTerm[];
  linkComponent: ComponentType<{ href: string }>;
  basePath: string;
}
export const GlossaryShow = (props: GlossaryShowProps) => {
  const {
    glossaryCategories,
    glossaryTerms,
    linkComponent: Link,
    basePath,
  } = props;
  return (
    <div className={styles.container}>
      <div className={classnames(styles.glossary_row, styles.main)}>
        <h1>Glossary</h1>
        <p>
          This is a glossary of techniques and tools for following and
          replicating the experiments. We provide brief descriptions and links
          to various techniques and tools that are referenced throughout
          Algocount.
        </p>
      </div>
      {glossaryCategories.map((category) =>
        glossaryTerms.some((term) => term.category_title === category.title) ? (
          <div key={category.title} className={classnames(styles.glossary_row)}>
            <Link href={`${basePath}glossary/${category.id}`}>
              <h1>{category.title}</h1>
            </Link>
            <p>{category.description}</p>
            <GlossaryTermsList
              glossaryTerms={glossaryTerms.filter(
                (term) => term.category_title === category.title
              )}
            />
          </div>
        ) : null
      )}
    </div>
  );
};
