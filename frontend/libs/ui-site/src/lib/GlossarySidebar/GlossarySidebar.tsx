// import { useHistory } from "react-router-dom";
import { GlossaryTerm } from '@algocount/shared/types';
import { GlossaryItem } from './GlossaryItem';
import styles from './GlossarySidebar.module.css';
// import { History } from "history";
import { ComponentType, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useReactHash } from '../useReactPath';
import { GlossaryCategory } from '@algocount/shared/types';
import { getRealPath } from '../utils';
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
  const ref = useRef<HTMLDivElement>(null);
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
    <div
      style={
        open
          ? { right: 0 }
          : { right: `-${ref.current ? ref.current.offsetWidth : 0}px` }
      }
      className={styles.glossary}
      ref={ref}
    >
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
          src={getRealPath('/assets/close.png')}
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
