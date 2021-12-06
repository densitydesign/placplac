import React from "react";
import styles from "./ResearchQuestion.module.css";
export const ResearchQuestion = (props: { researchQuestion?: string }) => {
  return (
    <div className={styles.container} id="researchQuestionDiv">
      <div className={styles.research_question_title}>
        <span>
          RESEARCH
          <br />
          QUESTION
        </span>
        <span className={styles.slashes}>{"//"}</span>
      </div>
      <span> {props.researchQuestion ? props.researchQuestion : ""}</span>
    </div>
  );
};
