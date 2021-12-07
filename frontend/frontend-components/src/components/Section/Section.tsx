import classNames from "classnames";
import React, { ComponentProps } from "react";
import { SectionOuter } from "../SectionOuter";
import { SectionTitle } from "../SectionTitle";
import styles from "./Section.module.css";

interface SectionProps extends ComponentProps<"div"> {
  small?: boolean;
  children: React.ReactNode;
  title?: string;
  contentAlign?: "start" | "arrow" | "title";
}
export const Section = (props: SectionProps) => {
  const {
    small = false,
    children,
    title,
    contentAlign = "start",
    className,
    ...rest
  } = props;
  return (
    <SectionOuter {...rest}>
      <div
        className={classNames(
          { [styles.small]: small, [styles.normal]: !small },
          styles.main
        )}
      >
        {title && <SectionTitle title={title} />}
        <div
          className={classNames(
            {
              [styles.content_align_title]: contentAlign === "title",
              [styles.content_align_arrow]: contentAlign === "arrow",
            },
            styles.content,
            className
          )}
        >
          {children}
        </div>
      </div>
    </SectionOuter>
  );
};
