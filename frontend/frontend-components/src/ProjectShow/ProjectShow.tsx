import { TextShow } from "../TextShow";
import { GlossaryTerm, Project } from "../types";
import styles from "./ProjectShow.module.css";
import { SectionTitle } from "../SectionTitle";
import { ExperimentSection } from "./components/ExperimentSection";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../GlossarySidebar";
import { GlossaryCategory } from "..";
import classNames from "classnames";
interface ProjectProps {
  project: Project;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  glossaryTerms: GlossaryTerm[];
  glossaryCategories: GlossaryCategory[];
}
export const ProjectShow = (props: ProjectProps) => {
  const {
    project,
    basePath,
    linkComponent,
    glossaryTerms,
    glossaryCategories,
  } = props;
  return (
    <>
      <div className={styles.hero_section}>
        <div className={styles.hero_section_content}>
          <h1>{project.title}</h1>
          {project.short_description && (
            <div className="text-only">
              <TextShow text={project.short_description} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.section_outer}>
        <div className={styles.section}>
          <SectionTitle title={"experiments"} />
          <div
            className={classNames(
              styles.section_content,
              styles.experiments_description
            )}
          >
            {project.experiments_description && (
              <TextShow text={project.experiments_description} />
            )}
          </div>
        </div>
      </div>
      {project.experiments.map((experiment) => (
        <ExperimentSection
          linkComponent={linkComponent}
          basePath={basePath}
          key={experiment.id}
          experiment={experiment}
        />
      ))}
      <div className={styles.section_outer}>
        <div className={styles.section} id="abouttheproject">
          <SectionTitle title={"about the project"} />
          <div
            className={classNames(
              styles.section_content_smaller,
              styles.section_content,
              "text-only"
            )}
          >
            {project.long_description && (
              <TextShow text={project.long_description} />
            )}
          </div>
        </div>
      </div>
      <GlossarySidebar
        glossaryCategories={glossaryCategories}
        linkComponent={linkComponent}
        basePath={basePath}
        glossaryTerms={glossaryTerms}
      />
    </>
  );
};
