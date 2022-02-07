import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Disclaimer.module.css';
interface DisclaimerProps {
  disclaimerType: string;
  description: string;
}
export const Disclaimer = (props: DisclaimerProps) => {
  const { disclaimerType, description } = props;

  return (
    <div className={classnames(styles.disclaimer, styles[disclaimerType])}>
      <span></span>
      <span>
        <h3>{disclaimerType}</h3>
      </span>
      <span>{description}</span>
    </div>
  );
};
