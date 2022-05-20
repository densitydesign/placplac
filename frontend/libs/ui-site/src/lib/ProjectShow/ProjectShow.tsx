import { ReferenceList } from '../components/ReferenceList';

import { TextShow } from '../TextShow';
import { Project } from '@algocount/shared/types';
import styles from './ProjectShow.module.css';
import { ExperimentSection } from './components/ExperimentSection';
import { ComponentType, useEffect, useRef, useState } from 'react';
import { GlossarySidebar } from '../GlossarySidebar';
import { Row } from '../components/Row';
import { Section } from '../components/Section';
import { translations } from '../translations';
import { useGlossaryAdjuster, useReferencesAdjuster } from '../hooks';
import { ImagesAnimated } from './components/ExperimentSection/ImagesAnimated';
import { getRealPath } from '../utils';

interface ProjectProps {
  project: Project;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
}

export const ProjectShow = (props: ProjectProps) => {
  const { project, basePath, linkComponent } = props;

  const [version, setVersion] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('ciao');
    setVersion(1);
    return () => setVersion(0);
  }, []);
  useGlossaryAdjuster(project.glossary_terms);
  useReferencesAdjuster(project.references);

  return (
    <>
      <div ref={container} className={styles.hero_section}>
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
              <h1>{project.title}</h1>
              {project.short_description && (
                <div className="text-only">{project.short_description}</div>
              )}
            </div>
            {project.project_explanation && (
              <div className={styles.hero_section_content}>
                <div className="text-only">{project.project_explanation}</div>
              </div>
            )}
          </div>
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
      {project.in_project_references &&
        project.in_project_references.length > 0 && (
          <Section
            id="references"
            title={translations[project.language].only_references_title}
          >
            <Row>
              <div className={'inner-column'}>
                <ReferenceList references={project.in_project_references} />
              </div>
            </Row>
          </Section>
        )}
      <GlossarySidebar
        glossaryCategories={project.glossary_categories}
        linkComponent={linkComponent}
        basePath={basePath}
        glossaryTerms={project.glossary_terms}
      />
    </>
  );
};
