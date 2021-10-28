import React, { CSSProperties } from "react";
import styles from "./TextShow.module.css";
interface TextShowProps {
  text: string;
  style?: CSSProperties;
}
export const TextShow = ({ text, style }: TextShowProps) => {
  return (
    <div
      className={styles.container}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
