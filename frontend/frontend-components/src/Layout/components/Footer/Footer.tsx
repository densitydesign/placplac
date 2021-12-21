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
import { Footer as FooterType, LanguageOptions } from "../../..";
import { translations } from "../../../translations";
interface FooterProps {
  language: LanguageOptions;
  footer?: FooterType;
}
export const Footer = (props: FooterProps) => {
  const { language, footer } = props;
  return (
    <>
      <div className={styles.main}>
        <div className={styles.platform}>
          <b>
            <u>Plaplac</u>
          </b>
          - a dissemination platform designed within the Algocount project by
          the Università degli Studi di Milano and DensityDesign Lab from Design
          Dipartment of Politecnico di Milano, funded by Fondazione Cariplo.
          License CC-by 2021.
        </div>
        <div className={styles.divider} />

        <div className={styles.column}>
          <span>{translations[language].foundedby_footer}:</span>
          <div className={styles.founded_by}>
            {footer &&
              footer.founded_by &&
              footer.founded_by.map((founder) => (
                <a href={founder.link}>
                  <img src={founder.image} />
                </a>
              ))}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.column}>
          <span>{translations[language].partners_footer}:</span>
          <div className={styles.partners}>
            {footer &&
              footer.partners &&
              footer.partners.map((founder) => (
                <a href={founder.link}>
                  <img src={founder.image} />
                </a>
              ))}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.column}>
          <span>{translations[language].contacts_footer}:</span>
          <div className={styles.contacts}>
            {footer && footer.socials && footer.socials.facebook && (
              <img src={facebook} />
            )}
            {footer && footer.socials && footer.socials.twitter && (
              <img src={twitter} />
            )}
            {footer && footer.socials && footer.socials.mail && (
              <img src={email} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
