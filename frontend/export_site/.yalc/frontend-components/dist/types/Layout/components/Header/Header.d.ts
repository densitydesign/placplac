import { ComponentType } from "react";
import { LanguageOptions } from "../../..";
import { Experiment } from "../../../types";
interface HeaderProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    experiments: Experiment[];
    language: LanguageOptions;
}
export declare const Header: (props: HeaderProps) => JSX.Element;
export {};
