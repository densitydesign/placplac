import { ComponentProps, ReactNode } from "react";
export declare type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
interface GridProps extends ComponentProps<"div"> {
    container?: boolean;
    children?: ReactNode;
    size?: GridSize;
    border?: boolean;
    borderTop?: boolean;
    borderLeft?: boolean;
    borderBottom?: boolean;
    borderRight?: boolean;
    innerPadding?: boolean;
}
export declare const Grid: (props: GridProps) => JSX.Element;
export {};
