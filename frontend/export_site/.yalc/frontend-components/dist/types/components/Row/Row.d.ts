import { ComponentProps, ReactNode } from "react";
interface RowProps extends ComponentProps<"div"> {
    spacing?: string;
    children?: ReactNode;
}
export declare const Row: (props: RowProps) => JSX.Element;
export {};
