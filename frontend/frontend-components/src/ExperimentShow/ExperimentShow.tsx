import classnames from "classnames";
import { TextShow } from "../TextShow";
import styles from "./ExperimentShow.module.css";

import { ExperimentSetupListShow } from "../ExperimentSetupListShow";
import { SectionTitle } from "../SectionTitle";
import { ResearchQuestion } from "./components/ResearchQuestion";
import { Experiment, GlossaryTerm } from "../types";
import { ExperimentDiagram } from "./components/ExperimentDiagram";
import { Disclaimer } from "./components/Disclaimer";
import { ImageShow } from "../ImageShow";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../GlossarySidebar";
import { GlossaryTermsList } from "../components/GlossaryTermsList";
import { GlossaryCategory } from "..";

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
      disclaimers,
      glossary_terms,
    },
    basePath,
    linkComponent,
    glossaryCategories,
  } = props;
  const renderItem = (item: { type: string } & any, noPadding: boolean) => {
    switch (item.type) {
      case "text": {
        return (
          <TextShow
            style={noPadding ? { padding: "0" } : undefined}
            text={item.content.text}
          />
        );
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
    noPadding: boolean = false
  ) => {
    const nCols = row.length;
    const size = 12 / nCols;
    const classGrid = `grid_${size}`;
    return (
      <div key={rowIndex} className={styles.container_row}>
        {row.map((col, colIndex) => (
          <div
            key={colIndex}
            className={classnames(
              styles[classGrid],
              styles.grid_container,
              styles.inner_column
            )}
          >
            {renderItem(col, noPadding)}
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (section: any[]) => {
    return section
      ? section.map((row, index) => renderRow(row, index, undefined))
      : null;
  };

  return (
    <>
      <div className={styles.top_section}>
        <div className={styles.top_section_part}>
          <div className={styles.grid_8}>
            {title && (
              <div className={styles.title}>
                <h1>{title}</h1>
              </div>
            )}
          </div>
          <div className={classnames(styles.container_column, styles.grid_4)}>
            {glossaryCategories.map((category) =>
              glossary_terms.some(
                (term) => term.category_title === category.title
              ) ? (
                <div
                  key={category.id}
                  className={classnames(
                    styles.container_column,
                    styles.grid_auto,
                    styles.glossary_terms_list
                  )}
                >
                  <h3>{category.title}</h3>
                  <GlossaryTermsList
                    glossaryTerms={glossary_terms.filter(
                      (term) => term.category_title === category.title
                    )}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className={styles.top_section_part}>
          <div className={classnames(styles.grid_8, styles.inner_column)}>
            <div className={styles.description}>
              {description && <TextShow text={description} />}
            </div>
          </div>
          <div
            style={{
              padding: "45px 60px",
            }}
            className={classnames(styles.container_column, styles.grid_4)}
          >
            <h3 style={{ marginTop: 0 }}>TABLE OF CONTENTS</h3>
            <ul className={styles.content_list}>
              <li>
                <a href="#context">Context</a>
              </li>
              <li>
                <a href="#researchQuestion">Research question</a>
              </li>
              <li>
                <a href="#experimentSetup">Experiment setup</a>
              </li>
              <li>
                <a href="#experimentDiagram">Experiment steps</a>
              </li>
              <li>
                <a href="#findings">Findings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {context && (
        <div id="context" className={classnames("section", styles.context)}>
          <SectionTitle title="context" />
          {renderSection(context)}
        </div>
      )}
      {researchQuestion && (
        <>
          <div id="researchQuestion" className={"section"}>
            <div className={styles.research_question_title}>
              <span>
                RESEARCH
                <br />
                QUESTION
              </span>
              <span className={styles.slashes}>{"//"}</span>
            </div>
            <div className={styles.research_question_content}>
              <h2>{researchQuestion}</h2>
            </div>
          </div>
          <ResearchQuestion researchQuestion={researchQuestion} />
        </>
      )}
      {experimentSetup && (
        <div id="experimentSetup" className={"section"}>
          <SectionTitle title="experiment setup" />
          {renderSection(experimentSetup)}
        </div>
      )}
      {steps && (
        <div id="experimentDiagram" className={"section"}>
          <SectionTitle title="experiment diagram" />
          <ExperimentDiagram steps={steps} />

          {disclaimers && (
            <div id="disclaimer">
              {disclaimers.map((disclaimer) => (
                <Disclaimer key={disclaimer} disclaimer={disclaimer} />
              ))}
            </div>
          )}
        </div>
      )}
      <div id="steps">
        {steps &&
          steps.map((step) => (
            <div
              id={`step${step.step_number}`}
              key={step.title}
              className={styles.step}
            >
              <div className={styles.sidebar}>
                <div className={styles.step_number}>
                  <h3>step {step.step_number}</h3>
                </div>
                <h3>{step.title}</h3>
                <TextShow style={{ padding: "0" }} text={step.description} />
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
        <div id="findings" className={"section"}>
          <SectionTitle title="findings" />
          <div>{renderSection(findings)}</div>
        </div>
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
