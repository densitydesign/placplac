import { GlossaryTerm } from '@algocount/shared/types';
import React, { ComponentType } from 'react';
import styles from './GlossaryTermsList.module.css';

interface GlossaryTermsListProps {
  glossaryTerms: Pick<GlossaryTerm, 'id' | 'title' | 'color'>[];
  linkTo?: string;
  linkComponent?: ComponentType<{ href: string }>;
}

export const GlossaryTermsList = (props: GlossaryTermsListProps) => {
  if (props.linkTo && !props.linkComponent) {
    throw new Error('You must pass linkto and linkcomponent together');
  }
  const { glossaryTerms, linkTo = '', linkComponent: Link } = props;

  return (
    <div className={styles.glossary_terms_list}>
      {glossaryTerms.map((term) => {
        return (
          <span
            key={term.id}
            className="mention"
            style={{ backgroundColor: term.color, marginRight: '10px' }}
          >
            {Link ? (
              <Link href={`${linkTo}#glossary/${term.id}`}>
                <span>{term.title}</span>
              </Link>
            ) : (
              <a href={`${linkTo}#glossary/${term.id}`}>
                <span>{term.title}</span>
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
};
