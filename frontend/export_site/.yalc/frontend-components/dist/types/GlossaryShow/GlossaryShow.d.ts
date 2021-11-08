import { ComponentType } from "react";
import { GlossaryTerm } from "..";
import { GlossaryCategory } from "../types";
interface GlossaryShowProps {
    glossaryCategories: GlossaryCategory[];
    glossaryTerms: GlossaryTerm[];
    linkComponent: ComponentType<{
        href: string;
    }>;
    basePath: string;
}
export declare const GlossaryShow: (props: GlossaryShowProps) => JSX.Element;
export {};
