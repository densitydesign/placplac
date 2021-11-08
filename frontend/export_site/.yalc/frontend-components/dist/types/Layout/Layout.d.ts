import React, { ComponentType } from "react";
import { Experiment } from "..";
interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
    experiments: Experiment[];
}
export declare const Layout: (props: LayoutProps) => JSX.Element;
export {};
