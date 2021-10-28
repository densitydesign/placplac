import { Link, useHistory } from "react-router-dom";
import { GlossaryTerm } from "../../../types";
import { GlossaryItem } from "./GlossaryItem";
import styles from "./GlossarySidebar.module.css";
import close from "../../../assets/close.png";
import { History } from "history";
import { useEffect, useState } from "react";
import React from "react";

interface GlossarySidebarProps {
  glossaryTerms: GlossaryTerm[];
  backend: boolean;
  mainHistory: History<unknown>;
  basePath: string;
}

export const GlossarySidebar = (props: GlossarySidebarProps) => {
  const history = useHistory();
  const { glossaryTerms, backend, mainHistory, basePath } = props;
  const hash = history.location.hash;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(hash);
    if (hash && hash.includes("glossary")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [hash]);

  return (
    <div style={open ? {} : { display: "none" }} className={styles.glossary}>
      <div className={styles.header}>
        <Link to={`${basePath}/glossary`}>Glossary</Link>
        <Link to={`${basePath}/glossary/tools`}>Tools</Link>
        <Link to={`${basePath}/glossary/tecniques`}>Tecniques</Link>
        <img
          className={styles.close_button}
          onClick={() => {
            mainHistory.push(mainHistory.location.pathname);
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
            mainHistory={mainHistory}
            key={term.id}
            glossaryTerm={term}
            backend={backend}
          />
        ))}
      </div>
    </div>
  );
};
