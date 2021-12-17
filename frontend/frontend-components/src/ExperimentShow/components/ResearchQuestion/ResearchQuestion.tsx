import React, { useEffect, useRef, useState } from "react";
import { TextShow } from "../../..";
import { Section } from "../../../components/Section";
import styles from "./ResearchQuestion.module.css";
export const ResearchQuestion = (props: { researchQuestion: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [classNameSection, setClassNameSection] = useState<string>();
  useEffect(() => {
    const onScroll = () => {
      if (ref.current && refContainer.current) {
        if (refContainer.current.getBoundingClientRect().top < 56) {
          ref.current.classList.add(
            styles.research_question_container_to_small
          );
          refContainer.current.classList.add(
            styles.research_question_outer_to_small
          );
          setClassNameSection(styles.section_no_margin);
        } else if (refContainer.current.getBoundingClientRect().top >= 56) {
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
    if (refContainer.current) {
      if (
        window.document.body.scrollHeight -
          refContainer.current.getBoundingClientRect().bottom >
        window.innerHeight
      ) {
        window.addEventListener("scroll", onScroll);
        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      } else {
        refContainer.current.style.position = "unset";
        refContainer.current.style.top = "unset";
        refContainer.current.style.zIndex = "unset";
      }
    }
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
            <h2>
              <TextShow text={props.researchQuestion} />
            </h2>
          </div>
        </div>
      </Section>
    </div>
  );
};
