import React from "react";
import styles from "./Disclaimer.module.css";
interface DisclaimerProps {
  disclaimer: string;
}
export const Disclaimer = ({ disclaimer }: DisclaimerProps) => {
  return (
    <div className={styles.disclaimer}>
      <span>
        <h3>DISCLAIMER:</h3>
      </span>
      <span>{disclaimer}</span>
    </div>
  );
};
