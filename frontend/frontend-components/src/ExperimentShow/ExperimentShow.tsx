import classnames from "classnames";
import { TextShow } from "../TextShow";
import styles from "./ExperimentShow.module.css";

import { ExperimentSetupListShow } from "../ExperimentSetupListShow";
import { SectionTitle } from "../components/SectionTitle";
import { ResearchQuestion } from "./components/ResearchQuestion";
import { Experiment, GlossaryTerm } from "../types";
import { ExperimentDiagram } from "./components/ExperimentDiagram";
import { Disclaimer } from "./components/Disclaimer";
import { ImageShow } from "../ImageShow";
import React, { ComponentType, useEffect, useState } from "react";
import { GlossarySidebar } from "../GlossarySidebar";
import { GlossaryTermsList } from "../components/GlossaryTermsList";
import { GlossaryCategory, LanguageOptions, Reference } from "..";
import { Section } from "../components/Section";
import { Flex, GridSize } from "../components/Flex";
import { ContentList } from "./components/ContentList/ContentList";
import { Row } from "../components/Row";
import classNames from "classnames";
import { translations } from "../translations";

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
  const [topPositionStep, setTopPositionStep] = useState(123);
  const glossaryCategoriesInText = glossaryCategories.filter((category) =>
    glossary_terms.some((term) => term.category_title === category.title)
  );
  useEffect(() => {
    const element = document.getElementById("researchQuestionDiv");
    if (element) {
      const resizeObserver = new ResizeObserver((event) => {
        setTopPositionStep(event[0].contentBoxSize[0].blockSize + 55);
      });

      resizeObserver.observe(element);
      return () => resizeObserver.unobserve(element);
    }
  });

  const renderItem = (item: { type: string } & any) => {
    switch (item.type) {
      case "text": {
        return <TextShow text={item.content.text} />;
      }
      case "image": {
        return (
          <ImageShow
            description={item.content.description}
            image={item.content.image}
            caption={item.content.caption}
            title={item.content.title}
            subtitle={item.content.subtitle}
            isWide={item.content.isWide}
          />
        );
      }

      case "listExperimentSetup": {
        return (
          <ExperimentSetupListShow
            title={item.content.title}
            list={item.content.list}
            subtitle={item.content.subtitle}
          />
        );
      }
    }
  };

  const renderRow = (
    row: any[],
    rowIndex: number,
    firstChildNoToppadding: boolean = false
  ) => {
    return (
      <Row key={rowIndex}>
        {row.map((col, colIndex) => (
          <div
            className={classNames({
              "inner-column": !firstChildNoToppadding,
              "inner-no-top": firstChildNoToppadding,
            })}
            key={colIndex}
          >
            {renderItem(col)}
          </div>
        ))}
      </Row>
    );
  };

  const renderSection = (
    section: any[],
    firstChildNoToppadding: boolean = false
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

  return (
    <>
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
          <Flex size={8} borderRight innerPadding className={"text-only"}>
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
          className={"text-only"}
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
          steps.map((step) => (
            <div
              style={{ minHeight: `calc(100vh - ${topPositionStep}px)` }}
              id={`step${step.step_number}`}
              key={step.title}
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
                <h3>{step.title}</h3>
                <TextShow text={step.description} />
              </div>
              <div
                className={classnames(styles.grid_auto, styles.sidebar_content)}
              >
                {renderSection(step.content)}
              </div>
            </div>
          ))}
      </div>
      {findings && (
        <Section
          id="findings"
          title={translations[language].experiment_findings}
          className={"section"}
          marginFix
        >
          {renderSection(findings, true)}
        </Section>
      )}
      {references && (
        <Section
          id="references"
          title={translations[language].references_title}
          className={"section"}
          marginFix
        >
          <Row>
            <div className={"inner-column"}>
              {references.map((reference, index) => (
                <p key={reference.id} id={`reference${reference.id}`}>
                  <span>
                    {`${index + 1}) ${reference.title} `}
                    {reference.link && (
                      <a
                        style={{ textDecoration: "underline" }}
                        href={reference.link}
                      >
                        {reference.link}
                      </a>
                    )}
                  </span>
                </p>
              ))}
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
    </>
  );
};
