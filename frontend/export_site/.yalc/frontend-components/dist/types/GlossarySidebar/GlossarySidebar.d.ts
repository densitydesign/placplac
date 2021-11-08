import { GlossaryTerm } from "../types";
import { ComponentType } from "react";
import { GlossaryCategory } from "..";
interface GlossarySidebarProps {
    glossaryTerms: GlossaryTerm[];
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryCategories: GlossaryCategory[];
}
export declare const GlossarySidebar: (props: GlossarySidebarProps) => JSX.Element;
export {};
