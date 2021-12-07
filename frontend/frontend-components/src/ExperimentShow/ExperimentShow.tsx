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
import { GlossaryCategory } from "..";
import { Section } from "../components/Section";
import { Grid, GridSize } from "../components/Grid";
import { ContentList } from "./components/ContentList/ContentList";

interface ExperimentShowProps {
  experiment: Experiment;
  basePath: string;
  linkComponent: ComponentType<{ href: string }>;
  glossaryCategories: GlossaryCategory[];
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
    },
    basePath,
    linkComponent,
    glossaryCategories,
  } = props;
  const [topPositionStep, setTopPositionStep] = useState(123);
  const glossaryCategoriesInText = glossaryCategories.filter((category) =>
    glossary_terms.some((term) => term.category_title === category.title)
  );
  useEffect(() => {
    const element = document.getElementById("researchQuestionDiv")!;
    const resizeObserver = new ResizeObserver((event) => {
      setTopPositionStep(event[0].contentBoxSize[0].blockSize + 55);
    });

    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
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

  const renderRow = (row: any[], rowIndex: number) => {
    const nCols = row.length;
    const size = (12 / nCols) as GridSize;
    return (
      <Grid container key={rowIndex}>
        {row.map((col, colIndex) => (
          <Grid key={colIndex} size={size}>
            {renderItem(col)}
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSection = (section: any[]) => {
    return section ? section.map((row, index) => renderRow(row, index)) : null;
  };

  return (
    <>
      <Grid container>
        <Grid container size={12} borderBottom>
          <Grid size={8} borderRight innerPadding>
            {title && <h1>{title}</h1>}
          </Grid>
          <Grid size={4} container>
            {glossaryCategoriesInText.map((category) => (
              <Grid
                container
                size={12}
                key={category.id}
                className={styles.glossary_terms_list}
                innerPadding
              >
                <Grid size={12}>
                  <h3>{category.title}</h3>
                </Grid>
                <Grid size={12}>
                  <GlossaryTermsList
                    glossaryTerms={glossary_terms.filter(
                      (term) => term.category_title === category.title
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container size={12} borderBottom>
          <Grid size={8} borderRight innerPadding className={"text-only"}>
            {description && <TextShow text={description} />}
          </Grid>
          <Grid size={4} innerPadding>
            <h3>TABLE OF CONTENTS</h3>
            <ContentList experiment={props.experiment} />
          </Grid>
        </Grid>
      </Grid>

      {context && (
        <Section
          title="context"
          id="context"
          contentAlign="title"
          className={"text-only"}
        >
          {renderSection(context)}
        </Section>
      )}
      {researchQuestion && (
        <ResearchQuestion researchQuestion={researchQuestion} />
      )}
      {experimentSetup && (
        <Section id="experimentSetup" title="experiment setup">
          {renderSection(experimentSetup)}
        </Section>
      )}
      {steps && (
        <Section id="experimentDiagram" title="experiment diagram">
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
                  <h3>step {step.step_number}</h3>
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
        <Section id="findings" title="findings" className={"section"}>
          {renderSection(findings)}
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
