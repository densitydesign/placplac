import classNames from "classnames";
import React, { ComponentProps, ReactNode } from "react";
import styles from "./Row.module.css";
interface RowProps extends ComponentProps<"div"> {
  spacing?: string;
  children?: ReactNode;
  divided?: boolean;
}
export const Row = (props: RowProps) => {
  const { children, className, divided = false, ...rest } = props;
  return (
    <div
      className={classNames(styles.main, className, {
        [styles.divided]: divided,
      })}
      {...rest}
    >
      {children && children}
    </div>
  );
};
