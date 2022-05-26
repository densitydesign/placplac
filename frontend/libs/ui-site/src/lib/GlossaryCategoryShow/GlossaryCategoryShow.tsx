import React, { ComponentType } from 'react';
import styles from './GlossaryCategoryShow.module.css';
import { TextShow } from '../TextShow';
import { GlossaryCategory, GlossaryTerm } from '@algocount/shared/types';
import { GlossaryTermsList } from '../components/GlossaryTermsList';
import { getRealPath } from '../utils';
interface GlossaryCategoryShowProps {
  glossaryCategory: GlossaryCategory;
  glossaryTerms: GlossaryTerm[];
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}
export const GlossaryCategoryShow = (props: GlossaryCategoryShowProps) => {
  const {
    glossaryCategory,
    glossaryTerms,
    basePath,
    linkComponent: Link,
  } = props;
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
            <div className={styles.term_title}>
              <span
                key={term.id}
                className="mention"
                style={{ backgroundColor: term.color }}
              >
                <span>{term.title}</span>
              </span>
            </div>
            <div className={styles.description}>
              {term.image && (
                <img
                  className={styles.term_image}
                  src={getRealPath(term.image)}
                  width={'100%'}
                  height="auto"
                  style={{ maxWidth: '500px' }}
                />
              )}
              <TextShow text={term.description} />
            </div>
            <table>
              <tbody>
                {term.used_in && term.used_in.length > 0 && (
                  <tr>
                    <td>Used in:</td>
                    <td>
                      <ul className={styles.used_in_list}>
                        {term.used_in.map((exp) => (
                          <li>
                            <Link
                              href={`${basePath}experiments/${exp.id}`}
                              key={exp.id}
                            >
                              <span role="img" aria-label="Link to experiment">
                                👀{' '}
                              </span>
                              {exp.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
                {term.related && term.related.length > 0 && (
                  <tr>
                    <td>Related:</td>
                    <td>
                      <GlossaryTermsList glossaryTerms={term.related} />
                    </td>
                  </tr>
                )}
                {term.more_info_url && term.more_info_url.length > 0 && (
                  <tr>
                    <td>External links:</td>
                    <td>
                      <ul className={styles.other_material_list}>
                        {term.more_info_url.map((exp) => (
                          <li key={exp.url}>
                            <a
                              target={'_blank'}
                              href={exp.url}
                              rel="noreferrer"
                            >
                              {exp.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
