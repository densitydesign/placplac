import classnames from "classnames";
import React, { ComponentType } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}
export const Header = (props: HeaderProps) => {
  const { basePath, linkComponent: Link } = props;
  return (
    <div className={styles.header}>
      <div className={classnames(styles.header_menu, styles.left)}>
        <div className={styles.item}>
          <Link href={basePath}>Home</Link>
        </div>
        <div className={styles.item}>
          <Link href="/project">Experiments</Link>
        </div>
        <div className={styles.item}>
          <Link href="/project">About</Link>
        </div>
      </div>
      <div className={classnames(styles.header_menu, styles.right)}>
        <div className={styles.item}>
          <Link href="/code/project/glossary">Glossary</Link>
        </div>
      </div>
    </div>
  );
};
