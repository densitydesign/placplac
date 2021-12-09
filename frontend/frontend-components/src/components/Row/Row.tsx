import classNames from "classnames";
import React, { ComponentProps, ReactNode } from "react";
import styles from "./Row.module.css";
interface RowProps extends ComponentProps<"div"> {
  spacing?: string;
  children?: ReactNode;
}
export const Row = (props: RowProps) => {
  const { children, className, ...rest } = props;
  return (
    <div className={classNames(styles.main, className)} {...rest}>
      {children && children}
    </div>
  );
};
