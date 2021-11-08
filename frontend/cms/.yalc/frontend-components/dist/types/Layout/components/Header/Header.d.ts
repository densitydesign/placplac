import { ComponentType } from "react";
import { Experiment } from "../../../types";
interface HeaderProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    experiments: Experiment[];
}
export declare const Header: (props: HeaderProps) => JSX.Element;
export {};
