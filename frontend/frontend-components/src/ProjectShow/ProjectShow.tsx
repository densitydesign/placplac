import { ReferenceList } from "../components/ReferenceList";

import { TextShow } from "../TextShow";
import { GlossaryTerm, Project } from "../types";
import styles from "./ProjectShow.module.css";
import { ExperimentSection } from "./components/ExperimentSection";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../GlossarySidebar";
import { GlossaryCategory } from "../types";
import { Row } from "../components/Row";
import { Section } from "../components/Section";
import { translations } from "../translations";
import { useReferencesAdjuster } from "../hooks";

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
  useReferencesAdjuster();
  return (
    <>
      <div className={styles.hero_section}>
        <div className={styles.hero_section_content}>
          <h1>{project.title}</h1>
          {project.short_description && (
            <div className="text-only">{project.short_description}</div>
          )}
        </div>
      </div>
      {project.experiments_description && (
        <Section
          title={translations[project.language].experiments_title}
          small
          className={styles.experiments_description}
        >
          <TextShow text={project.experiments_description} />
        </Section>
      )}

      {project.experiments.map((experiment) => (
        <ExperimentSection
          linkComponent={linkComponent}
          basePath={basePath}
          key={experiment.id}
          experiment={experiment}
        />
      ))}
      {project.long_description && (
        <Section
          small
          id="abouttheproject"
          title={translations[project.language].abouttheproject_title}
          className="text-only"
        >
          <TextShow text={project.long_description} />
        </Section>
      )}
      {project.references && (
        <Section
          id="references"
          title={translations[project.language].only_references_title}
        >
          <Row>
            <div className={"inner-column"}>
              <ReferenceList references={project.references} />
            </div>
          </Row>
        </Section>
      )}
      <GlossarySidebar
        glossaryCategories={glossaryCategories}
        linkComponent={linkComponent}
        basePath={basePath}
        glossaryTerms={glossaryTerms}
      />
    </>
  );
};
