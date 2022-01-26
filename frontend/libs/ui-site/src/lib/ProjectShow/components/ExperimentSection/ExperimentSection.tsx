import classNames from 'classnames';
import React, { ComponentType } from 'react';
import { Experiment } from '@algocount/shared/types';
import { TagsSliding } from './components/TagsSliding';
import styles from './ExperimentSection.module.css';
import LinesEllipsis from 'react-lines-ellipsis/lib/html';
interface ExperimentSectionProps {
  experiment: Experiment;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}
export const ExperimentSection = ({
  experiment,
  basePath,
  linkComponent: Link,
}: ExperimentSectionProps) => {
  return (
    <div className={styles.container}>
      <Link href={`${basePath}experiments/${experiment.id}`}>
        <div className={styles.main}>
          {experiment.tags && <TagsSliding strings={experiment.tags} />}
          <div className={styles.content}>
            <div
              className={classNames(styles.section, styles.cover)}
              style={{
                backgroundImage: `url('${experiment.cover}')`,
              }}
            ></div>
            <div className={classNames(styles.section, styles.description)}>
              <h2>{experiment.title}</h2>
              <LinesEllipsis
                maxLine="7"
                ellipsis="..."
                unsafeHTML={experiment.description}
              />
              {/* <TextShow text={experiment.description} /> */}
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.pointing_hand}>
        <img width="20px" height="auto" src={'/assets/hand-pointing.png'} />
      </div>
    </div>
  );
};
