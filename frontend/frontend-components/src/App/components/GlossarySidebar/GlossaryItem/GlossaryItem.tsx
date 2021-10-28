import React from "react";
import { TextShow } from "../../../../TextShow";
import { GlossaryTerm } from "../../../../types";
import { renderUrlImage } from "../../../utils";
import styles from "./GlossaryItem.module.css";
import seeMoreImage from "../../../../assets/see more.png";
import { History } from "history";

interface GlossaryItemProps {
  glossaryTerm: GlossaryTerm;
  backend: boolean;
  mainHistory: History<unknown>;
}
export const GlossaryItem = (props: GlossaryItemProps) => {
  const { glossaryTerm, backend, mainHistory } = props;
  return (
    <div id={`glossary/${glossaryTerm.id}`} className={styles.main}>
      {glossaryTerm.image && (
        <div className={styles.image_container}>
          <img
            width="100%"
            height="auto"
            src={renderUrlImage(glossaryTerm.image, backend)}
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

      <img
        onClick={() => mainHistory.push("/code/project/glossary/")}
        className={styles.see_more_button}
        src={seeMoreImage}
        width="28px"
        height="28px"
        alt="see more"
      />
    </div>
  );
};
