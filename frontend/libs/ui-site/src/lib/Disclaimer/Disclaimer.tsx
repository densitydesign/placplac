import classnames from 'classnames';
import React from 'react';
import styles from './Disclaimer.module.css';
interface DisclaimerProps {
  disclaimerType: string;
  description: string;
}
export const Disclaimer = (props: DisclaimerProps) => {
  const { disclaimerType, description } = props;
  return (
    <div className={classnames(styles.disclaimer, styles[disclaimerType])}>
      {/* <div style={{ position: 'absolute', top: 0 }}>
        <svg
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 5 L 5 0, 10 5, 15 0, 20 5, 25 0, 30 5, 35 0, 40 5, 45 0, 50 5, 55 0, 60 5,65 0, 70 5, 75 0, 80 5,85 0, 90 5 , 95 0, 100 5, 95 10, 100 15, 95  20, 100 25, 95 30,100 35, 95 40, 100 45, 95 50 , 100 55, 95 60, 100 65, 95 70, 100 75, 95 80, 100 85, 95 90, 100 95,95 100, 90 95, 85 100, 80 95, 75 100, 70 95, 65 100, 60 95, 55 100, 50 95, 45 100, 40 95, 35 100, 30 95, 25 100, 20 95, 15 100, 10 95, 5 100, 0 95, 5 90, 0 85 , 5 80, 0 75, 5 70, 0 65, 5 60, 0 55, 5 50, 0 45, 5 40, 0 35, 5 30, 0 25, 5 20, 0 15, 5 10, 0 5, 5 0"
            fill="none"
            stroke="black"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div> */}
      <span></span>
      <span>
        <h3>{disclaimerType}</h3>
      </span>
      <span>{description}</span>
    </div>
  );
};
