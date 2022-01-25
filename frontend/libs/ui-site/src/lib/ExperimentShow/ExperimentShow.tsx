import classnames from 'classnames';
import { TextShow } from '../TextShow';
import styles from './ExperimentShow.module.css';

import { ResearchQuestion } from './components/ResearchQuestion';
import {
  Experiment,
  GlossaryCategory,
  LanguageOptions,
  RowType,
} from '@algocount/shared/types';
import { ExperimentDiagram } from './components/ExperimentDiagram';
import { ComponentType, useEffect, useState } from 'react';
import { GlossarySidebar } from '../GlossarySidebar';
import { GlossaryTermsList } from '../components/GlossaryTermsList';
import { Section } from '../components/Section';
import { Flex } from '../components/Flex';
import { ContentList } from './components/ContentList/ContentList';
import { Row } from '../components/Row';
import classNames from 'classnames';
import { translations } from '../translations';
import { useReferencesAdjuster } from '../hooks';
import { ReferenceList } from '../components/ReferenceList';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SHOW_COMPONENTS_BUILDER } from '../builderBlocks';
export interface ExperimentShowProps {
  experiment: Experiment;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  glossaryCategories: GlossaryCategory[];
  language: LanguageOptions;
}
export const ExperimentShow = (props: ExperimentShowProps) => {
  const {
    experiment: {
      title,
      description,
      context,
      research_question: researchQuestion,
      experiment_setup: experimentSetup,
      steps,
      findings,
      glossary_terms,
      references,
    },
    language,
    basePath,
    linkComponent,
    glossaryCategories,
  } = props;
  const [topPositionStep, setTopPositionStep] = useState(55);
  const glossaryCategoriesInText = glossaryCategories.filter((category) =>
    glossary_terms.some((term) => term.category_title === category.title)
  );
  useEffect(() => {
    const element = document.getElementById('researchQuestionDiv');
    if (element) {
      setTopPositionStep(element.getBoundingClientRect().height + 55);
    } else {
      setTopPositionStep(0);
    }
  });

  useReferencesAdjuster();

  const renderRow = (
    row: RowType,
    rowIndex: number,
    firstChildNoToppadding = false
  ) => {
    return (
      <Row divided={row.divided} key={rowIndex}>
        {row.cols.map((col, colIndex) => (
          <div
            className={classNames({
              'inner-column': !firstChildNoToppadding,
              'inner-no-top': firstChildNoToppadding,
            })}
            key={colIndex}
          >
            {col?.type in SHOW_COMPONENTS_BUILDER &&
              SHOW_COMPONENTS_BUILDER[col.type].render(col.content)}
          </div>
        ))}
      </Row>
    );
  };

  const renderSection = (
    section: RowType[],
    firstChildNoToppadding = false
  ) => {
    return section
      ? section.map((row, index) =>
          renderRow(
            row,
            index,
            firstChildNoToppadding && index === 0 ? true : false
          )
        )
      : null;
  };

  const renderStep = (section: RowType[]) => {
    return section
      ? section.map((row, index) => (
          <Row divided={row.divided} key={index}>
            {row.cols.map((col, colIndex) => (
              <div className={'inner-column'} key={colIndex}>
                {col?.type in SHOW_COMPONENTS_BUILDER &&
                  SHOW_COMPONENTS_BUILDER[
                    col.type === 'image' ? 'image_step' : col.type
                  ].render(col.content)}
              </div>
            ))}
          </Row>
        ))
      : null;
  };

  return (
    <SimpleReactLightbox>
      <Flex container>
        <Flex container size={12} borderBottom>
          <Flex size={8} borderRight innerPadding>
            {title && <h1>{title}</h1>}
          </Flex>
          <Flex size={4} container>
            {glossaryCategoriesInText.map((category) => (
              <Flex
                container
                size={12}
                key={category.id}
                className={styles.glossary_terms_list}
                innerPadding
              >
                <Flex size={12}>
                  <h3>{category.title}</h3>
                  <GlossaryTermsList
                    glossaryTerms={glossary_terms.filter(
                      (term) => term.category_title === category.title
                    )}
                  />
                </Flex>
                <Flex size={12}></Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex container size={12} borderBottom>
          <Flex size={8} borderRight innerPadding className={'text-only'}>
            {description && <TextShow text={description} />}
          </Flex>
          <Flex size={4} innerPadding>
            <h3>{translations[language].experiment_tableofcontents}</h3>
            <ContentList language={language} experiment={props.experiment} />
          </Flex>
        </Flex>
      </Flex>
      {context && (
        <Section
          title={translations[language].experiment_context}
          id="context"
          contentAlign="title"
          className={'text-only'}
          marginFix
        >
          {renderSection(context, true)}
        </Section>
      )}
      {researchQuestion && (
        <ResearchQuestion researchQuestion={researchQuestion} />
      )}
      {experimentSetup && (
        <Section
          id="experimentSetup"
          title={translations[language].experiment_experimentsetup}
          marginFix
        >
          {renderSection(experimentSetup, true)}
        </Section>
      )}
      {steps && steps.length > 0 && (
        <Section
          id="experimentDiagram"
          title={translations[language].experiment_experimentdiagram}
        >
          <ExperimentDiagram steps={steps} />
        </Section>
      )}
      <div id="steps">
        {steps &&
          steps.map((step, index) => (
            <div
              style={{ minHeight: `calc(100vh - ${topPositionStep}px)` }}
              id={`step${step.step_number}`}
              key={index}
              className={styles.step}
            >
              <div
                className={styles.sidebar}
                style={{ top: `${topPositionStep}px` }}
              >
                <div className={styles.step_number}>
                  <h3>
                    {translations[language].experiment_step} {step.step_number}
                  </h3>
                </div>
                <h3 style={{ marginBottom: '3em' }}>{step.title}</h3>
                {step.glossary_terms && step.glossary_terms.length > 0 && (
                  <div style={{ marginBottom: '1.5em' }}>
                    <GlossaryTermsList glossaryTerms={step.glossary_terms} />
                  </div>
                )}
                <ul className={styles.download_list}>
                  {step.downloads.map((download, index) => (
                    <li key={download.id}>
                      <a href={download.file} download={download.name}>
                        {download.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={classnames(styles.grid_auto, styles.sidebar_content)}
              >
                {renderStep(step.content)}
              </div>
            </div>
          ))}
      </div>
      {findings && (
        <Section
          id="findings"
          title={translations[language].experiment_findings}
          marginFix
        >
          {renderSection(findings, true)}
        </Section>
      )}
      {references && references.length > 0 && (
        <Section
          id="references"
          title={translations[language].references_title}
        >
          <Row>
            <div className={'inner-column'}>
              <ReferenceList references={references} />
            </div>
          </Row>
        </Section>
      )}
      <GlossarySidebar
        glossaryCategories={glossaryCategories}
        linkComponent={linkComponent}
        basePath={basePath}
        glossaryTerms={glossary_terms}
      />
    </SimpleReactLightbox>
  );
};
