import { TextShow } from "../TextShow";
import { GlossaryTerm, Project } from "../types";
import styles from "./ProjectShow.module.css";
import { SectionTitle } from "../SectionTitle";
import { ExperimentSection } from "./components/ExperimentSection";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../GlossarySidebar";
interface ProjectProps {
  project: Project;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  glossaryTerms: GlossaryTerm[];
}
export const ProjectShow = (props: ProjectProps) => {
  const { project, basePath, linkComponent, glossaryTerms } = props;
  return (
    <>
      <div className={styles.hero_section}>
        <div className={styles.hero_section_content}>
          <h1>{project.title}</h1>
          <TextShow text={project.short_description} />
        </div>
      </div>
      <div className={"section"}>
        <div className={styles.experiments}>
          <SectionTitle title={"experiments"} />
          <div className={styles.experiments_description}>
            <TextShow text={project.experiments_description} />
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
      <div className={"section"}>
        <div className={styles.experiments}>
          <SectionTitle title={"about the project"} />
          <div className={styles.experiments_description}>
            <TextShow text={project.long_description} />
          </div>
        </div>
      </div>
      <GlossarySidebar
        linkComponent={linkComponent}
        basePath={basePath}
        glossaryTerms={glossaryTerms}
      />
    </>
  );
};
