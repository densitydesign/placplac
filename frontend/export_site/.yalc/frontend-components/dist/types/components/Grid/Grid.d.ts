import { ComponentProps, ReactNode } from "react";
interface GridProps extends ComponentProps<"div"> {
    spacing?: string;
    children?: ReactNode;
}
export declare const Grid: (props: GridProps) => JSX.Element;
export {};
