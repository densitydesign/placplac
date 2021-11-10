import classnames from "classnames";
import React, { ComponentType } from "react";
import { Header } from "./components/Header";
import styles from "./Layout.module.css";
import { Experiment } from "..";
import { Footer } from "./components/Footer";

interface LayoutProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  children: React.ReactNode;
  experiments: Experiment[];
}

export const Layout = (props: LayoutProps) => {
  const { basePath, linkComponent, children, experiments } = props;
  return (
    <div className={classnames(styles.main, "main-application")}>
      <Header
        experiments={experiments}
        basePath={basePath}
        linkComponent={linkComponent}
      />
      <div className={styles.content_wrapper}>{children}</div>
      <Footer />
    </div>
  );
};
