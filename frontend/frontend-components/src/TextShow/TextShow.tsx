import React, { CSSProperties } from "react";
import styles from "./TextShow.module.css";

export interface TextShowProps {
  text: string;
}
export const TextShow = ({ text }: TextShowProps) => {
  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
