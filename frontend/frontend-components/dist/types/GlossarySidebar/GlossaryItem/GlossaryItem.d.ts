import { ComponentType } from "react";
import { GlossaryTerm } from "../../types";
interface GlossaryItemProps {
    glossaryTerm: GlossaryTerm;
    linkComponent: ComponentType<{
        href: string;
    }>;
    basePath: string;
}
export declare const GlossaryItem: (props: GlossaryItemProps) => JSX.Element;
export {};
