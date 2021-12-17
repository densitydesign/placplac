import classnames from "classnames";
import React, { ComponentType } from "react";
import { Header } from "./components/Header";
import styles from "./Layout.module.css";
import { Experiment, LanguageOptions, Project } from "..";
import { Footer } from "./components/Footer";
import { BackToTopButton } from "../components/BackToTopButton";

interface LayoutProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  children: React.ReactNode;
  experiments: Experiment[];
  language: LanguageOptions;
}

export const Layout = (props: LayoutProps) => {
  const { basePath, linkComponent, children, experiments, language } = props;
  return (
    <div className={classnames(styles.main, "main-application")}>
      <Header
        language={language}
        experiments={experiments}
        basePath={basePath}
        linkComponent={linkComponent}
      />
      <div className={styles.content_wrapper}>{children}</div>
      <Footer language={language} />
      <BackToTopButton />
    </div>
  );
};
