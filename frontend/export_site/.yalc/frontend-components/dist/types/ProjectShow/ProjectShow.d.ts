import { GlossaryTerm, Project } from "../types";
import { ComponentType } from "react";
import { GlossaryCategory } from "../types";
interface ProjectProps {
    project: Project;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryTerms: GlossaryTerm[];
    glossaryCategories: GlossaryCategory[];
}
export declare const ProjectShow: (props: ProjectProps) => JSX.Element;
export {};
