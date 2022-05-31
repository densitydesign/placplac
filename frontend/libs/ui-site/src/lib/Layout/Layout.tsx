import classnames from 'classnames';
import React, { ComponentType, useEffect, useState } from 'react';
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
import { Helmet } from 'react-helmet';
import { MobileAlert } from './components/MobileAlert';

interface LayoutProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  children: React.ReactNode;
  project: Project;
}

export const Layout = (props: LayoutProps) => {
  const { basePath, linkComponent, children, project } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  useEffect(() => {
    const localIsMobile = localStorage.getItem('mobileModeDeactivated');
    if (!localIsMobile) {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobile);
      setMobileMode(isMobile);
    }
  }, []);

  return (
    <div
      id="main-application"
      className={classnames(styles.main, 'main-application', {
        [styles.main_mobile]: !mobileMode && isMobile,
      })}
    >
      <Helmet
        meta={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
      />
      {mobileMode ? (
        <MobileAlert
          onReadMoreClick={() => {
            setMobileMode(false);
            localStorage.setItem('mobileModeDeactivated', 'true');
          }}
          project={project}
        />
      ) : (
        <>
          <Helmet
            meta={[
              {
                name: 'viewport',
                content:
                  'width=device-width, initial-scale=0, shrink-to-fit=YES',
              },
            ]}
          />
          <Header
            project={project}
            basePath={basePath}
            linkComponent={linkComponent}
          />
          <div className={styles.content_wrapper}>{children}</div>
          <Footer footer={project.footer} language={project.language} />
          <BackToTopButton />
        </>
      )}
    </div>
  );
};
