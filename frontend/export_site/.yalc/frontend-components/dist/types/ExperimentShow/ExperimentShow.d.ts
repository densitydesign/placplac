import { Experiment, GlossaryTerm } from "../types";
import { ComponentType } from "react";
import { GlossaryCategory } from "..";
interface ExperimentShowProps {
    experiment: Experiment;
    glossaryTerms: GlossaryTerm[];
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryCategories: GlossaryCategory[];
}
export declare const ExperimentShow: (props: ExperimentShowProps) => JSX.Element;
export {};
