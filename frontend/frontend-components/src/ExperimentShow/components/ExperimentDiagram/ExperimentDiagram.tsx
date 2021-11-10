import React, { ComponentType } from "react";
import { Step } from "../../../types";
import styles from "./ExperimentDiagram.module.css";
interface ExperimentDiagramProps {
  steps: Step[];
}
export const ExperimentDiagram = (props: ExperimentDiagramProps) => {
  const { steps } = props;
  return (
    <div className={styles.experiment_diagram_container}>
      {steps.map((step) => (
        <div key={step.step_number} className={styles.step}>
          <div className={styles.step_number}>
            <div className={styles.step_arrow}></div>
            <div className={styles.step_number_content}>
              <a key={step.title} href={`#step${step.step_number}`}>
                <h3>{step.step_number}</h3>
              </a>
            </div>
          </div>
          <div className={styles.step_title}>{step.title}</div>
        </div>
      ))}
    </div>
  );
};
