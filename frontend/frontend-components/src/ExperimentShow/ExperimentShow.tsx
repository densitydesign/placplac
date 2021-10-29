import classnames from "classnames";
import { TextShow } from "../TextShow";
import styles from "./ExperimentShow.module.css";

import { ExperimentSetupListShow } from "../ExperimentSetupListShow";
import { SectionTitle } from "../SectionTitle";
import { ResearchQuestion } from "./components/ResearchQuestion";
// import { HashLink } from "react-router-hash-link";
import { Experiment, GlossaryTerm } from "../types";
import { ExperimentDiagram } from "./components/ExperimentDiagram";
import { Disclaimer } from "./components/Disclaimer";
import { ImageShow } from "../ImageShow";
import React, { ComponentType } from "react";
import { GlossarySidebar } from "../GlossarySidebar";

interface ExperimentShowProps {
  experiment: Experiment;
  glossaryTerms: GlossaryTerm[];
  basePath: string;
  backend: boolean;
  linkComponent: ComponentType<{ href: string }>;
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
    },
    glossaryTerms,
    basePath,
    linkComponent,
    backend,
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
    noPadding: boolean = false,
    rowClass: string = styles.container_row
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
  const renderContext = () => {
    return context!.map((row, index) => renderRow(row, index, true));
  };

  const renderSection = (
    section: any[],
    rowClass: string = styles.container_row
  ) => {
    return section!.map((row, index) =>
      renderRow(row, index, undefined, rowClass)
    );
  };

  const renderToolsCategory = () => {
    return glossaryTerms
      .filter((term) => term.category_title === "Tools")
      .map((term) => {
        return (
          <span key={term.id} className="mention">
            <a href={`#glossary/${term.id}`}>
              <span style={{ backgroundColor: term.color }}>{term.title}</span>
            </a>
          </span>
        );
      });
  };
  const renderTeqniquesCategory = () => {
    return glossaryTerms
      .filter((term) => term.category_title === "Techniques")
      .map((term) => {
        return (
          <span key={term.id} className="mention" style={{ display: "flex" }}>
            <a href={`#glossary/${term.id}`}>
              <span style={{ backgroundColor: term.color }}>{term.title}</span>
            </a>
          </span>
        );
      });
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
            <div
              style={{
                padding: "45px 60px",
                borderBottom: "1px solid black",
              }}
              className={classnames(styles.container_column, styles.grid_auto)}
            >
              <h3 style={{ marginTop: 0 }}>TOOLS</h3>
              <div
                className={classnames(
                  styles.container_row,
                  styles.glossary_terms_list
                )}
              >
                {renderToolsCategory()}
              </div>
            </div>
            <div
              style={{
                padding: "45px 60px",
              }}
              className={classnames(styles.container_column, styles.grid_auto)}
            >
              <h3 style={{ marginTop: 0 }}>TECHNIQUES</h3>
              <div
                className={classnames(
                  styles.container_row,
                  styles.glossary_terms_list
                )}
              >
                {renderTeqniquesCategory()}
              </div>
            </div>
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
                <a href="#disclaimer">Disclaimer</a>
              </li>
              <li>
                <a href="#experimentDiagram">Experiment diagram</a>
              </li>
              <li>
                <a href="#steps">Steps</a>
              </li>
              <li>
                <a href="#findings">Findings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {context && (
        <div id="context" className={"section"}>
          <SectionTitle title="context" />
          <div className={styles.context}>{renderContext()}</div>
        </div>
      )}
      {researchQuestion && (
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
      )}
      <ResearchQuestion researchQuestion={researchQuestion} />
      {experimentSetup && (
        <div id="experimentSetup" className={"section"}>
          <SectionTitle title="experiment setup" />
          {renderSection(experimentSetup)}
        </div>
      )}
      <ResearchQuestion researchQuestion={researchQuestion} />
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
      <ResearchQuestion researchQuestion={researchQuestion} />
      {steps &&
        steps.map((step) => (
          <div key={step.title}>
            <div id="steps" className={styles.step}>
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
            <ResearchQuestion researchQuestion={researchQuestion} />
          </div>
        ))}
      {findings && (
        <div id="findings" className={"section"}>
          <SectionTitle title="findings" />
          <div>{renderSection(findings)}</div>
        </div>
      )}
      <GlossarySidebar
        linkComponent={linkComponent}
        basePath={basePath}
        backend={backend}
        glossaryTerms={glossaryTerms}
      />
    </>
  );
};
