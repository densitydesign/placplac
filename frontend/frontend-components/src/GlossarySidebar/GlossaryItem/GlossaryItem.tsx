import React, { ComponentType } from "react";
import { TextShow } from "../../TextShow";
import { GlossaryTerm } from "../../types";
import styles from "./GlossaryItem.module.css";
import seeMoreImage from "../../assets/see more.png";

interface GlossaryItemProps {
  glossaryTerm: GlossaryTerm;
  linkComponent: ComponentType<{ href: string }>;
  basePath: string;
}
export const GlossaryItem = (props: GlossaryItemProps) => {
  const { glossaryTerm, linkComponent: Link, basePath } = props;
  return (
    <div id={`glossary/${glossaryTerm.id}`} className={styles.main}>
      {glossaryTerm.image && (
        <div className={styles.image_container}>
          <img
            width="100%"
            height="auto"
            src={glossaryTerm.image}
            alt={glossaryTerm.category_title}
          />
          <div
            className={styles.pill}
            style={{ backgroundColor: glossaryTerm.color }}
          >
            <span>{glossaryTerm.title}</span>
          </div>
        </div>
      )}
      <TextShow text={glossaryTerm.description} />
      <Link
        href={`${basePath}glossary/${glossaryTerm.glossary_category}#glossary/${glossaryTerm.id}`}
      >
        <img
          className={styles.see_more_button}
          src={seeMoreImage}
          width="28px"
          height="28px"
          alt="see more"
        />
      </Link>
    </div>
  );
};
