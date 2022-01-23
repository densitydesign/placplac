import React from 'react';
import styles from './SectionTitle.module.css';
export const SectionTitle = (props: { title: string }) => {
  return (
    <div className={styles.title}>
      <span>
        <img alt={'title'} src={'/assets/arrow_title.webp'} />
      </span>
      <b>{props.title}</b>
    </div>
  );
};
