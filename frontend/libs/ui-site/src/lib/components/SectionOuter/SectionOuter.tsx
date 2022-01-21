import React, { ComponentProps } from "react";
import styles from "./SectionOuter.module.css";

interface SectionOuterProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export const SectionOuter = (props: SectionOuterProps) => {
  const { children, ...rest } = props;
  return (
    <div {...rest} className={styles.main}>
      {children}
    </div>
  );
};
