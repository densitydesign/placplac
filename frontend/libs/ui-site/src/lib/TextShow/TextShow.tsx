import classNames from "classnames";
import React, { CSSProperties } from "react";
import styles from "./TextShow.module.css";

export interface TextShowProps {
  text: string;
}
export const TextShow = ({ text }: TextShowProps) => {
  return (
    <div
      className={classNames(styles.container, "ql-editor")}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
