import React from "react";
import { Section } from "../../../components/Section";
import styles from "./ResearchQuestion.module.css";
export const ResearchQuestion = (props: { researchQuestion?: string }) => {
  return (
    <>
      <Section id="researchQuestion">
        <div className={styles.research_question_title_big}>
          <span>
            RESEARCH
            <br />
            QUESTION
          </span>
          <span className={styles.slashes}>{"//"}</span>
        </div>
        <div className={styles.research_question_content_big}>
          <h2>{props.researchQuestion}</h2>
        </div>
      </Section>

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
    </>
  );
};
