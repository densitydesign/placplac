import { ComponentType } from "react";
import { GlossaryTerm } from "../../types";
interface GlossaryItemProps {
    glossaryTerm: GlossaryTerm;
    backend: boolean;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const GlossaryItem: (props: GlossaryItemProps) => JSX.Element;
export {};
