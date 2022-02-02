import React from 'react';
import { getRealPath } from '../../utils';
import styles from './SectionTitle.module.css';
export const SectionTitle = (props: { title: string }) => {
  return (
    <div className={styles.title}>
      <span>
        <img alt={'title'} src={getRealPath('/assets/arrow_title.webp')} />
      </span>
      <b>{props.title}</b>
    </div>
  );
};
