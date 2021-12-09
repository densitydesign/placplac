import classNames from "classnames";
import React, { ComponentProps, ReactNode } from "react";
import styles from "./Grid.module.css";
interface GridProps extends ComponentProps<"div"> {
  spacing?: string;
  children?: ReactNode;
}
export const Grid = (props: GridProps) => {
  const { children, className, ...rest } = props;
  return (
    <div className={classNames(styles.main, className)} {...rest}>
      {children && children}
    </div>
  );
};
