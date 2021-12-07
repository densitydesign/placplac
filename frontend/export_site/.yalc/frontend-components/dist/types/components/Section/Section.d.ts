import React, { ComponentProps } from "react";
interface SectionProps extends ComponentProps<"div"> {
    small?: boolean;
    children: React.ReactNode;
    title?: string;
    contentAlign?: "start" | "arrow" | "title";
}
export declare const Section: (props: SectionProps) => JSX.Element;
export {};
