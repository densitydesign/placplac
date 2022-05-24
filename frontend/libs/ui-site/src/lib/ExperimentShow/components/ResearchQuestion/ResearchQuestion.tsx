import React, { useEffect, useRef, useState } from 'react';
import { TextShow } from '../../../TextShow';
import { Section } from '../../../components/Section';
import styles from './ResearchQuestion.module.css';
import { Portal } from 'react-portal';

export const ResearchQuestion = (props: { researchQuestion: string }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [showSmall, setShowSmall] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (refContainer.current) {
        if (refContainer.current.getBoundingClientRect().bottom < 56) {
          setShowSmall(true);
        } else if (refContainer.current.getBoundingClientRect().bottom >= 56) {
          setShowSmall(false);
        }
      }
    };
    if (refContainer.current) {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <>
      <div
        ref={refContainer}
        id="researchQuestion"
        className={styles.research_question_outer}
      >
        <Section>
          <div className={styles.research_question_container}>
            <div className={styles.research_question_title_big}>
              <span>
                RESEARCH
                <br />
                QUESTION
              </span>
              <span className={styles.slashes}>{'//'}</span>
            </div>
            <div className={styles.research_question_content_big}>
              <h2>
                <TextShow text={props.researchQuestion} />
              </h2>
            </div>
          </div>
        </Section>
      </div>
      <Portal node={document && document.getElementById('main-application')}>
        <div
          id="researchQuestionDiv"
          className={styles.research_question_outer_small}
          style={{
            ...(showSmall ? {} : { opacity: 0, visibility: 'hidden' }),
          }}
        >
          <Section className={styles.section_no_margin}>
            <div className={styles.research_question_container_small}>
              <div className={styles.research_question_title_big}>
                <span>
                  RESEARCH
                  <br />
                  QUESTION
                </span>
                <span className={styles.slashes}>{'//'}</span>
              </div>
              <div className={styles.research_question_content_big}>
                <h2>
                  <TextShow text={props.researchQuestion} />
                </h2>
              </div>
            </div>
          </Section>
        </div>
      </Portal>
    </>
  );
};
