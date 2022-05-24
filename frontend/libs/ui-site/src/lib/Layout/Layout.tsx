import classnames from 'classnames';
import React, { ComponentType } from 'react';
import { Header } from './components/Header';
import styles from './Layout.module.css';
import {
  Experiment,
  Footer as FooterType,
  LanguageOptions,
  Project,
} from '@algocount/shared/types';
import { Footer } from './components/Footer';
import { BackToTopButton } from '../components/BackToTopButton';

interface LayoutProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  children: React.ReactNode;
  project: Project;
}

export const Layout = (props: LayoutProps) => {
  const { basePath, linkComponent, children, project } = props;
  return (
    <div
      id="main-application"
      className={classnames(styles.main, 'main-application')}
    >
      <Header
        project={project}
        basePath={basePath}
        linkComponent={linkComponent}
      />
      <div className={styles.content_wrapper}>{children}</div>
      <Footer footer={project.footer} language={project.language} />
      <BackToTopButton />
    </div>
  );
};
