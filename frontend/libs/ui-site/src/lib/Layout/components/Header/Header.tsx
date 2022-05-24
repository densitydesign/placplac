import classnames from 'classnames';
import React, { ComponentType, useEffect, useRef, useState } from 'react';
import { translations } from '../../../translations';
import { Experiment, LanguageOptions, Project } from '@algocount/shared/types';
import styles from './Header.module.css';

interface HeaderProps {
  basePath: string;
  linkComponent: ComponentType<{ href: string; className?: string }>;
  project: Project;
}
export const Header = (props: HeaderProps) => {
  const { basePath, linkComponent: Link, project } = props;
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (submenuVisible && ref.current && !ref.current.contains(e.target)) {
        setSubmenuVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [submenuVisible]);

  useEffect(() => {
    setSubmenuVisible(false);
  }, [window.location.pathname]);

  return (
    <div className={styles.header} id="header">
      <div
        className={classnames(styles.header_menu)}
        style={{ flex: '1 auto' }}
      >
        <Link href={`${basePath}#`} className={styles.title}>
          {project.title}
        </Link>
      </div>
      <div ref={ref} className={classnames(styles.header_menu, styles.right)}>
        <div
          className={styles.item}
          onClick={() => setSubmenuVisible((old) => !old)}
        >
          {translations[project.language].experiments_title}
        </div>
        <div
          style={{ visibility: submenuVisible ? 'visible' : 'hidden' }}
          className={styles.submenu}
        >
          <ul>
            {project.experiments.map((experiment) => (
              <Link
                key={experiment.id}
                href={`${basePath}experiments/${experiment.id}`}
              >
                <li>{experiment.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <Link className={styles.item} href={`${basePath}#abouttheproject`}>
          {translations[project.language].abouttheproject_menu}
        </Link>

        <Link className={styles.item} href={`${basePath}glossary`}>
          {translations[project.language].glossary_menu}
        </Link>
      </div>
    </div>
  );
};
