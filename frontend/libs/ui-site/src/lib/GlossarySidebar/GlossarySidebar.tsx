import { GlossaryTerm } from '@algocount/shared/types';
import { GlossaryItem } from './GlossaryItem';
import styles from './GlossarySidebar.module.css';
import { ComponentType, useEffect, useRef, useState } from 'react';
import { useReactHash } from '../useReactPath';
import { getRealPath } from '../utils';
import classNames from 'classnames';
interface GlossarySidebarProps {
  glossaryTerms: GlossaryTerm[];
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}

export const GlossarySidebar = (props: GlossarySidebarProps) => {
  const { glossaryTerms, basePath, linkComponent: Link } = props;
  const hash = useReactHash();
  const ref = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<GlossaryTerm>();

  useEffect(() => {
    if (hash && hash.includes('glossary/')) {
      const glossaryTermId = hash.replace('#glossary/', '');
      const glossaryTerm = glossaryTerms.find(
        (term) => term.id.toString() === glossaryTermId
      );
      if (glossaryTerm) {
        setActiveItem(glossaryTerm);
      }
    } else {
      setActiveItem(undefined);
    }
  }, [glossaryTerms, hash]);

  return (
    <div
      className={classNames(styles.glossary, { [styles.open]: !!activeItem })}
      ref={ref}
    >
      <div className={styles.header}>
        <Link href={`${basePath}glossary`}>Glossary</Link>

        <img
          className={styles.close_button}
          onClick={() => {
            window.history.replaceState(null, '', '#');
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }}
          src={getRealPath('/assets/close.png')}
          width={'auto'}
          height={'55px'}
          alt="close"
        />
      </div>
      <div className={styles.content} id="glossarySidebarContent">
        {activeItem && (
          <GlossaryItem
            basePath={basePath}
            linkComponent={Link}
            glossaryTerm={activeItem}
          />
        )}
      </div>
    </div>
  );
};
