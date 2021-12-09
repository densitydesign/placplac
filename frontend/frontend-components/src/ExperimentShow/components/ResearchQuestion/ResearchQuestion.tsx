import React, { useEffect, useRef, useState } from "react";
import { Section } from "../../../components/Section";
import styles from "./ResearchQuestion.module.css";
export const ResearchQuestion = (props: { researchQuestion?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [classNameSection, setClassNameSection] = useState<string>();
  useEffect(() => {
    const onScroll = () => {
      if (ref.current && refContainer.current) {
        console.log(ref.current.getBoundingClientRect());

        if (refContainer.current.getBoundingClientRect().top <= 57) {
          ref.current.classList.add(
            styles.research_question_container_to_small
          );
          refContainer.current.classList.add(
            styles.research_question_outer_to_small
          );
          setClassNameSection(styles.section_no_margin);
        } else {
          ref.current.classList.remove(
            styles.research_question_container_to_small
          );
          refContainer.current.classList.remove(
            styles.research_question_outer_to_small
          );
          setClassNameSection(undefined);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div
      id="researchQuestionDiv"
      ref={refContainer}
      className={styles.research_question_outer}
    >
      <Section className={classNameSection} id="researchQuestion">
        <div ref={ref} className={styles.research_question_container}>
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
        </div>
      </Section>
    </div>
  );
};
