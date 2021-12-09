import classNames from "classnames";
import React, { ComponentProps, ReactNode } from "react";
import styles from "./Flex.module.css";

export type GridSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

interface FlexProps extends ComponentProps<"div"> {
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

export const Flex = (props: FlexProps) => {
  const {
    container = false,
    size,
    className,
    children,
    border,
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    innerPadding,
    ...rest
  } = props;
  const gridSize = size ? `col_${size}` : "";
  return (
    <div
      {...rest}
      className={classNames(
        {
          [styles.row]: container,
          [styles[gridSize]]: !!size,
          [styles.border]: border,
          [styles.border_left]: borderLeft,
          [styles.border_right]: borderRight,
          [styles.border_top]: borderTop,
          [styles.border_bottom]: borderBottom,
          "inner-column": innerPadding,
        },
        className
      )}
    >
      {children && children}
    </div>
  );
};
