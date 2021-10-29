import { ComponentType } from "react";
import { Experiment } from "../../../types";
interface ExperimentSectionProps {
    experiment: Experiment;
    backend: boolean;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const ExperimentSection: ({ experiment, backend, basePath, linkComponent: Link, }: ExperimentSectionProps) => JSX.Element;
export {};
