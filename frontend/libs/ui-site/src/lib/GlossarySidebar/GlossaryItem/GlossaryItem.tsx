import { GlossaryTerm } from '@algocount/shared/types';
import React, { ComponentType } from 'react';
import { TextShow } from '../../TextShow';
import { getRealPath } from '../../utils';
import styles from './GlossaryItem.module.css';
interface GlossaryItemProps {
  glossaryTerm: GlossaryTerm;
  linkComponent: ComponentType<{ href: string; style?: any }>;
  basePath: string;
}
export const GlossaryItem = (props: GlossaryItemProps) => {
  const { glossaryTerm, linkComponent: Link, basePath } = props;
  return (
    <div id={`glossary/${glossaryTerm.id}`} className={styles.main}>
      <div className={styles.image_container}>
        <div
          className={styles.pill}
          style={{ backgroundColor: glossaryTerm.color }}
        >
          <span>{glossaryTerm.title}</span>
        </div>
        {glossaryTerm.image && (
          <img
            width="100%"
            height="auto"
            src={glossaryTerm.image}
            alt={glossaryTerm.category_title}
          />
        )}
      </div>

      <TextShow text={glossaryTerm.description} />

      <Link
        style={{ textDecoration: 'none' }}
        href={`${basePath}glossary/${glossaryTerm.glossary_category}#glossary/${glossaryTerm.id}`}
      >
        <button className={styles.see_more_button}>Read more</button>
      </Link>
    </div>
  );
};
