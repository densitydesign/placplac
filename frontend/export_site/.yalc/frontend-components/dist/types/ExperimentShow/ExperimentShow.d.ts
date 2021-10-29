import { Experiment, GlossaryTerm } from "../types";
import { ComponentType } from "react";
interface ExperimentShowProps {
    experiment: Experiment;
    glossaryTerms: GlossaryTerm[];
    basePath: string;
    backend: boolean;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const ExperimentShow: (props: ExperimentShowProps) => JSX.Element;
export {};
