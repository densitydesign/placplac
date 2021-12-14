import { Experiment } from "../types";
import { ComponentType } from "react";
import { GlossaryCategory, LanguageOptions } from "..";
export interface ExperimentShowProps {
    experiment: Experiment;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryCategories: GlossaryCategory[];
    language: LanguageOptions;
}
export declare const ExperimentShow: (props: ExperimentShowProps) => JSX.Element;
