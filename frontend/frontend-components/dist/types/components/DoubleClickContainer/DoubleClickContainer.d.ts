import { ReactNode } from "react";
interface DoubleClickContainerProps {
    onDoubleClick: () => void;
    height?: string;
    children: ReactNode;
}
export declare const DoubleClickContainer: (props: DoubleClickContainerProps) => JSX.Element;
export {};
