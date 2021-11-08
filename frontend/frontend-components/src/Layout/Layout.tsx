import classnames from "classnames";
import React, { ComponentType } from "react";
import { Header } from "./components/Header";
import styles from "./Layout.module.css";
import { Experiment } from "..";

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
      {children}
    </div>
  );
};
