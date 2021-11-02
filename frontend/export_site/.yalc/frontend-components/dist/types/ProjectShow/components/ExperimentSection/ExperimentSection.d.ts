import { ComponentType } from "react";
import { Experiment } from "../../../types";
interface ExperimentSectionProps {
    experiment: Experiment;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const ExperimentSection: ({ experiment, basePath, linkComponent: Link, }: ExperimentSectionProps) => JSX.Element;
export {};
