import React, { ComponentProps } from "react";
interface SectionOuterProps extends ComponentProps<"div"> {
    children: React.ReactNode;
}
export declare const SectionOuter: (props: SectionOuterProps) => JSX.Element;
export {};
