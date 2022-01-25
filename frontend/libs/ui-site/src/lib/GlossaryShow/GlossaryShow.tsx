import classnames from 'classnames';
import React, { ComponentType } from 'react';
import { GlossaryTermsList } from '../components/GlossaryTermsList';
import { translations } from '../translations';
import {
  GlossaryCategory,
  GlossaryTerm,
  LanguageOptions,
} from '@algocount/shared/types';
import styles from './GlossaryShow.module.css';
import { TextShow } from '../TextShow';

interface GlossaryShowProps {
  glossaryCategories: GlossaryCategory[];
  glossaryTerms: GlossaryTerm[];
  linkComponent: ComponentType<{ href: string }>;
  basePath: string;
  language: LanguageOptions;
  description?: string;
}
export const GlossaryShow = (props: GlossaryShowProps) => {
  const {
    glossaryCategories,
    glossaryTerms,
    linkComponent: Link,
    basePath,
    language,
    description,
  } = props;
  return (
    <div className={styles.container}>
      <div className={classnames(styles.glossary_row, styles.main)}>
        <h1>{translations[language].glossary_title}</h1>
        <div style={{ marginTop: '1.5em' }}>
          {description && <TextShow text={description} />}
        </div>
      </div>
      {glossaryCategories.map((category) =>
        glossaryTerms.some((term) => term.category_title === category.title) ? (
          <div key={category.title} className={classnames(styles.glossary_row)}>
            <Link href={`${basePath}glossary/${category.id}`}>
              <h1>{category.title}</h1>
            </Link>
            <p>{category.description}</p>
            <GlossaryTermsList
              linkComponent={Link}
              linkTo={`${basePath}glossary/${category.id}`}
              glossaryTerms={glossaryTerms.filter(
                (term) => term.category_title === category.title
              )}
            />
          </div>
        ) : null
      )}
    </div>
  );
};
