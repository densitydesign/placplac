import React from "react";
import { Experiment } from "../../../types";
import styles from "./ContentList.module.css";

interface ContentListProps {
  experiment: Experiment;
}
export const ContentList = (props: ContentListProps) => {
  const { experiment } = props;
  return (
    <ul className={styles.content_list}>
      {experiment.context && (
        <li>
          <a href="#context">Context</a>
        </li>
      )}
      {experiment.research_question && (
        <li>
          <a href="#researchQuestion">Research question</a>
        </li>
      )}
      {experiment.experiment_setup && (
        <li>
          <a href="#experimentSetup">Experiment setup</a>
        </li>
      )}
      {experiment.steps && (
        <li>
          <a href="#experimentDiagram">Experiment steps</a>
        </li>
      )}
      {experiment.findings && (
        <li>
          <a href="#findings">Findings</a>
        </li>
      )}
    </ul>
  );
};
