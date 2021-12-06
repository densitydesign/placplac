import React, { ComponentType, useEffect, useRef } from "react";
import { Step } from "../../../types";
import styles from "./ExperimentDiagram.module.css";

interface ExperimentDiagramProps {
  steps: Step[];
}

const Step = (props: {
  step: Step;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  index: number;
}) => {
  const { step, showLeftArrow, showRightArrow, index } = props;

  return (
    <div key={step.step_number} className={styles.step}>
      <a key={step.title} href={`#step${step.step_number}`}>
        <div className={styles.step_number}>
          {showLeftArrow && (
            <div id={`stepNumber${index}Left`} className={styles.arrow_left} />
          )}
          <div className={styles.step_number_content}>
            <h3>{step.step_number}</h3>
          </div>
          {showRightArrow && (
            <div
              id={`stepNumber${index}Right`}
              className={styles.arrow_right}
            />
          )}
        </div>
        <div className={styles.step_title}>{step.title}</div>
      </a>
    </div>
  );
};

export const ExperimentDiagram = (props: ExperimentDiagramProps) => {
  const { steps } = props;
  return (
    <div className={styles.experiment_diagram_container}>
      {steps.map((step, index) => (
        <Step
          index={index}
          showLeftArrow={index !== 0}
          step={step}
          key={step.step_number}
          showRightArrow={index !== steps.length - 1}
        />
      ))}
    </div>
  );
};
