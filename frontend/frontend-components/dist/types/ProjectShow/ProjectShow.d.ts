import { GlossaryTerm, Project } from "../types";
import { ComponentType } from "react";
interface ProjectProps {
    project: Project;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryTerms: GlossaryTerm[];
}
export declare const ProjectShow: (props: ProjectProps) => JSX.Element;
export {};
