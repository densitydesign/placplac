// import { useHistory } from "react-router-dom";
import { GlossaryTerm } from "../types";
import { GlossaryItem } from "./GlossaryItem";
import styles from "./GlossarySidebar.module.css";
import close from "../assets/close.png";
// import { History } from "history";
import { ComponentType, useEffect, useState } from "react";
import React from "react";
import { useReactHash } from "../useReactPath";
import { GlossaryCategory } from "..";

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
    if (hash && hash.includes("glossary")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [hash]);

  return (
    <div style={open ? {} : { display: "none" }} className={styles.glossary}>
      <div className={styles.header}>
        <Link href={`${basePath}glossary`}>Glossary</Link>
        {glossaryCategories.map((category) => (
          <Link href={`${basePath}glossary/${category.id}`}>
            {category.title}
          </Link>
        ))}
        <img
          className={styles.close_button}
          onClick={() => {
            window.history.replaceState(null, "", "#");
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }}
          src={close}
          width={"auto"}
          height={"55px"}
          alt="close"
        />
      </div>
      <div className={styles.content}>
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
