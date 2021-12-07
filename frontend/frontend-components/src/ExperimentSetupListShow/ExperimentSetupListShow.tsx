import React from "react";
import { Grid } from "../components/Grid";
import styles from "./ExperimentSetupListShow.module.css";

export interface ExperimentSetupListShowProps {
  title: string;
  subtitle: string;
  list: string[];
}
export const ExperimentSetupListShow = (
  props: ExperimentSetupListShowProps
) => {
  const { title, subtitle, list } = props;
  return (
    <Grid container border className={styles.container}>
      <Grid size={12} className={styles.title}>
        {title}
      </Grid>
      <Grid size={12} className={styles.subtitle}>
        {subtitle}
      </Grid>
      <Grid size={12} className={styles.content}>
        <ul>
          {list.map((str, index) => (
            <li key={index}>{str}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};
