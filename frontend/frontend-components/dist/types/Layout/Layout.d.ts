import React, { ComponentType } from "react";
interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
}
export declare const Layout: (props: LayoutProps) => JSX.Element;
export {};
