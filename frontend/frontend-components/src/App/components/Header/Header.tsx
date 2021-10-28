import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  basePath: string;
}
export const Header = (props: HeaderProps) => {
  const { basePath } = props;
  return (
    <div className={styles.header}>
      <div className={classnames(styles.header_menu, styles.left)}>
        <div className={styles.item}>
          <Link to={basePath}>Home</Link>
        </div>
        <div className={styles.item}>
          <Link to="/project">Experiments</Link>
        </div>
        <div className={styles.item}>
          <Link to="/project">About</Link>
        </div>
      </div>
      <div className={classnames(styles.header_menu, styles.right)}>
        <div className={styles.item}>
          <Link to="/code/project/glossary">Glossary</Link>
        </div>
      </div>
    </div>
  );
};
