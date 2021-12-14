import React, { ComponentType } from "react";
import { Experiment, LanguageOptions } from "..";
interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
    experiments: Experiment[];
    language: LanguageOptions;
}
export declare const Layout: (props: LayoutProps) => JSX.Element;
export {};
