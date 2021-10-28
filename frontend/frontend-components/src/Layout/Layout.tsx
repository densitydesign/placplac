import classnames from "classnames";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../App/components/GlossarySidebar";
import { Header } from "../App/components/Header";
import { GlossaryTerm } from "../types";
import styles from "./Layout.module.css";

interface LayoutProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { basePath, linkComponent, children } = props;
  return (
    <div className={classnames(styles.main, "main-application")}>
      <Header basePath={basePath} linkComponent={linkComponent} />
      {children}
    </div>
  );
};
