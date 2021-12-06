import { Step } from "../../../types";
interface ExperimentDiagramProps {
    steps: Step[];
}
declare const Step: (props: {
    step: Step;
    showLeftArrow: boolean;
    showRightArrow: boolean;
    index: number;
}) => JSX.Element;
export declare const ExperimentDiagram: (props: ExperimentDiagramProps) => JSX.Element;
export {};
