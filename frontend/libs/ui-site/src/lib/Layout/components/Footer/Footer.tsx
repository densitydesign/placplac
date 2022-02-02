import React from 'react';
import styles from './Footer.module.css';
import { Footer as FooterType, LanguageOptions } from '@algocount/shared/types';
import { translations } from '../../../translations';
import { getRealPath } from '../../../utils';

interface FooterProps {
  language: LanguageOptions;
  footer?: FooterType;
}
export const Footer = (props: FooterProps) => {
  const { language, footer } = props;
  return (
    <div className={styles.main}>
      <div className={styles.platform}>
        <b>
          <u>PlacPlac</u>
        </b>
        - a dissemination platform designed within the Algocount project by the
        Università degli Studi di Milano and DensityDesign Lab from Design
        Dipartment of Politecnico di Milano, funded by Fondazione Cariplo.
        License CC-by 2021.
      </div>

      <div className={styles.divider} />
      <div className={styles.column}>
        <span>{translations[language].foundedby_footer}:</span>
        <div className={styles.founded_by}>
          <a href={'https://www.fondazionecariplo.it'}>
            <img src={getRealPath('/assets/cariplo.png')} />
          </a>
          {footer &&
            footer.founded_by &&
            footer.founded_by.map((founder, index) => (
              <a key={index} href={founder.link}>
                <img src={getRealPath(founder.image)} />
              </a>
            ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <span>{translations[language].partners_footer}:</span>
        <div className={styles.partners}>
          <a href={'https://www.unimi.it'}>
            <img src={getRealPath('/assets/uni.png')} />
          </a>
          <a href={'https://www.polimi.it'}>
            <img src={getRealPath('/assets/poli.png')} />
          </a>
          <a href={'https://www.densitydesign.org'}>
            <img src={getRealPath('/assets/density.png')} />
          </a>
          {footer &&
            footer.partners &&
            footer.partners.map((founder, index) => (
              <a key={index} href={founder.link}>
                <img src={getRealPath(founder.image)} />
              </a>
            ))}
        </div>
      </div>

      {footer && footer.socials && (
        <>
          <div className={styles.divider} />
          <div className={styles.column}>
            <span>{translations[language].contacts_footer}:</span>
            <div className={styles.contacts}>
              {footer && footer.socials && footer.socials.facebook && (
                <img src={getRealPath('/assets/facebook-logo-white.png')} />
              )}
              {footer && footer.socials && footer.socials.twitter && (
                <img src={getRealPath('/assets/twitter-icon-18-256.png')} />
              )}
              {footer && footer.socials && footer.socials.mail && (
                <img src={getRealPath('/assets/email.png')} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
