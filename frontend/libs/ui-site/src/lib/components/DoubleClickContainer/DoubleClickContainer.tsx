import React, { ReactNode } from "react";
import styles from "./DoubleClickContainer.module.css";
interface DoubleClickContainerProps {
  onDoubleClick: () => void;
  height?: string;
  children: ReactNode;
}
export const DoubleClickContainer = (props: DoubleClickContainerProps) => {
  const { height, onDoubleClick, children } = props;
  return (
    <div
      style={{ width: "100%", height: height ? height : "400px" }}
      className={styles.container}
    >
      <div className={styles.child}>
        <div className={styles.click_me} onDoubleClick={onDoubleClick}>
          <span>Double click for enabling exploration</span>
        </div>
      </div>
      <div style={{ width: "100%", height: "100%", opacity: 0.7 }}>
        {children}
      </div>
    </div>
  );
};
