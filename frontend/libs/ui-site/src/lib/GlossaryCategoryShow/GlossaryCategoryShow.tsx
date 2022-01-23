import React from 'react';
import styles from './GlossaryCategoryShow.module.css';
import { TextShow } from '../TextShow';
import { GlossaryCategory, GlossaryTerm } from '@algocount/shared/types';
import { GlossaryTermsList } from '../components/GlossaryTermsList';
interface GlossaryCategoryShowProps {
  glossaryCategory: GlossaryCategory;
  glossaryTerms: GlossaryTerm[];
}
export const GlossaryCategoryShow = (props: GlossaryCategoryShowProps) => {
  const { glossaryCategory, glossaryTerms } = props;
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <h2>{glossaryCategory.title}</h2>
        <p>{glossaryCategory.description}</p>
        <GlossaryTermsList glossaryTerms={glossaryTerms} />
      </div>
      <div className={styles.content}>
        {glossaryTerms.map((term) => (
          <div
            key={term.id}
            id={`glossary/${term.id}`}
            className={styles.glossary_term_item}
          >
            <div
              style={{ backgroundColor: term.color }}
              className={styles.title}
            >
              {term.title}
              <img className={styles.arrow} src={'/assets/arrowleftdown.png'} />
            </div>
            <div className={styles.description}>
              {term.image && (
                <img
                  className={styles.term_mage}
                  src={term.image}
                  width={'100%'}
                  height="auto"
                />
              )}
              <TextShow text={term.description} />
            </div>
            <div className={styles.more_info_url}>
              <a href={term.more_info_url}>{term.more_info_url}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
