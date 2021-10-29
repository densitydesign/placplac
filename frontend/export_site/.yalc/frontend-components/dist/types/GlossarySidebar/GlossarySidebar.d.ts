import { GlossaryTerm } from "../types";
import { ComponentType } from "react";
interface GlossarySidebarProps {
    glossaryTerms: GlossaryTerm[];
    backend: boolean;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const GlossarySidebar: (props: GlossarySidebarProps) => JSX.Element;
export {};
