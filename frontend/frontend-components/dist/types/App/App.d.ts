import { Project } from "../types";
interface AppProps {
    project: Project;
    backend?: boolean;
    mainHistory?: any;
    basePath: string;
}
export declare const App: (props: AppProps) => JSX.Element;
export {};
