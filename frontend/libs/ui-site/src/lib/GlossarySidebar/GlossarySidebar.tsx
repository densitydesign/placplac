// import { useHistory } from "react-router-dom";
import { GlossaryTerm } from '@algocount/shared/types';
import { GlossaryItem } from './GlossaryItem';
import styles from './GlossarySidebar.module.css';
// import { History } from "history";
import { ComponentType, useEffect, useState } from 'react';
import React from 'react';
import { useReactHash } from '../useReactPath';
import { GlossaryCategory } from '@algocount/shared/types';
interface GlossarySidebarProps {
  glossaryTerms: GlossaryTerm[];
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  glossaryCategories: GlossaryCategory[];
}

export const GlossarySidebar = (props: GlossarySidebarProps) => {
  const {
    glossaryTerms,
    basePath,
    linkComponent: Link,
    glossaryCategories,
  } = props;
  const hash = useReactHash();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hash && hash.includes('glossary')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [hash]);

  useEffect(() => {
    if (open && hash && hash.includes('glossary')) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [open]);
  return (
    <div style={open ? {} : { display: 'none' }} className={styles.glossary}>
      <div className={styles.header}>
        <Link href={`${basePath}glossary`}>Glossary</Link>
        {glossaryCategories.map((category) => (
          <Link key={category.id} href={`${basePath}glossary/${category.id}`}>
            {category.title}
          </Link>
        ))}
        <img
          className={styles.close_button}
          onClick={() => {
            window.history.replaceState(null, '', '#');
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }}
          src={'/assets/close.png'}
          width={'auto'}
          height={'55px'}
          alt="close"
        />
      </div>
      <div className={styles.content} id="glossarySidebarContent">
        {glossaryTerms.map((term) => (
          <GlossaryItem
            basePath={basePath}
            linkComponent={Link}
            key={term.id}
            glossaryTerm={term}
          />
        ))}
      </div>
    </div>
  );
};
