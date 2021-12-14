import React from "react";
import { LanguageOptions } from "../../..";
import { translations } from "../../../translations";
import { Experiment } from "../../../types";
import styles from "./ContentList.module.css";

interface ContentListProps {
  experiment: Experiment;
  language: LanguageOptions;
}
export const ContentList = (props: ContentListProps) => {
  const { experiment, language } = props;
  return (
    <ul className={styles.content_list}>
      {experiment.context && (
        <li>
          <a href="#context">{translations[language].experiment_context}</a>
        </li>
      )}
      {experiment.research_question && (
        <li>
          <a href="#researchQuestion">
            {translations[language].experiment_researchquestion}
          </a>
        </li>
      )}
      {experiment.experiment_setup && (
        <li>
          <a href="#experimentSetup">
            {translations[language].experiment_experimentsetup}
          </a>
        </li>
      )}
      {experiment.steps && (
        <li>
          <a href="#experimentDiagram">
            {translations[language].experiment_experimentdiagram}
          </a>
        </li>
      )}
      {experiment.findings && (
        <li>
          <a href="#findings"> {translations[language].experiment_findings}</a>
        </li>
      )}
    </ul>
  );
};
