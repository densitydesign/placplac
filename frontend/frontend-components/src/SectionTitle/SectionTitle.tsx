import React from "react";
import styles from "./SectionTitle.module.css";
import imgTitle from "../assets/arrow_title.webp";

export const SectionTitle = (props: { title: string }) => {
  return (
    <div className={styles.title}>
      <span>
        <img alt={"title"} src={imgTitle} />
      </span>
      <b>{props.title}</b>
    </div>
  );
};
