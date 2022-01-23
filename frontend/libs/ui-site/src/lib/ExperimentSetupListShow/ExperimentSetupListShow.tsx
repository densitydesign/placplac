import React from "react";
import styles from "./ExperimentSetupListShow.module.css";

export interface ExperimentSetupListShowProps {
  title: string;
  subtitle: string;
  list: string[];
}
export const ExperimentSetupListShow = (
  props: ExperimentSetupListShowProps
) => {
  const { title, subtitle, list } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.content}>
        <ul>
          {list.map((str, index) => (
            <li key={index}>{str}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
