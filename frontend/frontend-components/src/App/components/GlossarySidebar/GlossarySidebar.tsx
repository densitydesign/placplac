// import { useHistory } from "react-router-dom";
import { GlossaryTerm } from "../../../types";
import { GlossaryItem } from "./GlossaryItem";
import styles from "./GlossarySidebar.module.css";
import close from "../../../assets/close.png";
// import { History } from "history";
import { ComponentType, useEffect, useState } from "react";
import React from "react";
import { useReactHash } from "../../../useReactPath";

interface GlossarySidebarProps {
  glossaryTerms: GlossaryTerm[];
  backend: boolean;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}

export const GlossarySidebar = (props: GlossarySidebarProps) => {
  //   const history = useHistory();
  const {
    glossaryTerms,
    backend,
    basePath,
    linkComponent: Link,
  } = props;
  const hash = useReactHash();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("hash", hash);
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
        <Link href={`${basePath}glossary/tools`}>Tools</Link>
        <Link href={`${basePath}glossary/tecniques`}>Tecniques</Link>
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
          <GlossaryItem key={term.id} glossaryTerm={term} backend={backend} />
        ))}
      </div>
    </div>
  );
};
