import classNames from "classnames";
import React, { ComponentType } from "react";
import { TextShow } from "../../../TextShow";
import { Experiment } from "../../../types";
import { renderUrlImage } from "../../../utils";
import { TagsSliding } from "./components/TagsSliding";
import styles from "./ExperimentSection.module.css";
import hand from "../../../assets/hand-pointing.png";
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
  console.log(experiment.cover);
  return (
    <>
      <TagsSliding strings={experiment.tags} />
      <div className={styles.main}>
        <div
          className={classNames(styles.section, styles.cover)}
          style={{
            backgroundImage: `url('${experiment.cover}')`,
          }}
        ></div>
        <div className={classNames(styles.section, styles.content)}>
          <Link href={`${basePath}experiments/${experiment.id}`}>
            <h2>{experiment.title}</h2>
          </Link>
          <TextShow text={experiment.description} />
        </div>
      </div>
      <div className={styles.pointing_hand}>
        <img width="20px" height="auto" src={hand} />
      </div>
    </>
  );
};
