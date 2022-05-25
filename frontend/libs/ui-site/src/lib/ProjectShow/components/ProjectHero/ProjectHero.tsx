import { Project } from '@algocount/shared/types';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { TextShow } from '../../../TextShow';
import { getRealPath } from '../../../utils';
import { ImagesAnimated } from '../ExperimentSection/ImagesAnimated';
import styles from './ProjectHero.module.css';
export const ProjectHero = ({
  project,
  topContent,
  adjustHeightForHeader = true,
  bottomContent,
}: {
  project: Project;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  adjustHeightForHeader?: boolean;
}) => {
  const [version, setVersion] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setVersion(1);
    return () => setVersion(0);
  }, []);
  return (
    <div
      ref={container}
      className={classNames(styles.hero_section, {
        [styles.no_header]: !adjustHeightForHeader,
      })}
    >
      {container.current && version === 1 && (
        <div className={styles.background}>
          <ImagesAnimated
            width={container.current!.clientWidth}
            height={container.current!.clientHeight}
            imagesUrls={project.experiments
              .filter((experiment) => !!experiment.cover)
              ?.map((experiment) => getRealPath(experiment.cover))}
          />
        </div>
      )}
      <div className={styles.description_container}>
        <div className={styles.description}>
          <div className={styles.hero_section_content}>
            {topContent && topContent}
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <h1>{project.title}</h1>
              {project.short_description && (
                <div className="text-only">
                  <TextShow text={project.short_description} />
                </div>
              )}
            </div>
          </div>
          {project.project_explanation ||
            (bottomContent && (
              <div className={styles.hero_section_content}>
                {project.project_explanation && (
                  <TextShow text={project.project_explanation} />
                )}
                {bottomContent && bottomContent}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
