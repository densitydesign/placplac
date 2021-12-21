import React, { ComponentType } from "react";
import { Experiment, Footer as FooterType, LanguageOptions } from "..";
interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
    experiments: Experiment[];
    language: LanguageOptions;
    footer?: FooterType;
}
export declare const Layout: (props: LayoutProps) => JSX.Element;
export {};
