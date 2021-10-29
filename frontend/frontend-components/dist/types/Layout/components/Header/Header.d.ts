import { ComponentType } from "react";
interface HeaderProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
export declare const Header: (props: HeaderProps) => JSX.Element;
export {};
