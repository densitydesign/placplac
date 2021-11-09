import React from "react";
import styles from "./Footer.module.css";
import cariplo from "../../../assets/fondazione-cariplo-white 1.png";
import uni from "../../../assets/uni-milano.png";
import poli from "../../../assets/poli.png";
import density from "../../../assets/logo-density-bianco 1.png";
import facebook from "../../../assets/facebook-logo-white.png";
import point from "../../../assets/point.png";
import twitter from "../../../assets/twitter-icon-18-256.png";
import email from "../../../assets/email.png";
export const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.column}>
        <span>Founded by:</span>
        <img src={cariplo} />
      </div>
      <div className={styles.divider} />
      <div className={styles.column}>
        <span>Partners:</span>
        <div className={styles.image_list}>
          <img src={uni} />
          <img src={poli} />
          <img src={density} />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.column}>
        <span>Contacts:</span>
        <div className={styles.image_list}>
          <img src={facebook} />
          <img src={point} />
          <img src={twitter} />
          <img src={point} />
          <img src={email} />
        </div>
      </div>
    </div>
  );
};
