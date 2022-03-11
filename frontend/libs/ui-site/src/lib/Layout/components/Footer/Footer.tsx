import React from 'react';
import styles from './Footer.module.css';
import { Footer as FooterType, LanguageOptions } from '@algocount/shared/types';
import { translations } from '../../../translations';
import { getRealPath } from '../../../utils';

interface FooterProps {
  language: LanguageOptions;
  footer?: FooterType;
}
function parseUsername(url: string) {
  let output = '';

  // Parse username
  const matches = url.match(
    /(?:https?:\/\/)?(?:www.)?(?:twitter|medium|facebook|vimeo|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im
  );

  // Set output
  output = matches && matches.length ? matches[1] : output;

  return output;
}
export const Footer = (props: FooterProps) => {
  const { language, footer } = props;

  return (
    <div className={styles.main}>
      <div className={styles.platform}>
        <div
          dangerouslySetInnerHTML={{
            __html: translations[language].info_platform,
          }}
        />
        <br />
        <a href="https://creativecommons.org/licenses/by/4.0/">
          <img
            src="https://licensebuttons.net/l/by/3.0/88x31.png"
            alt="cc-by-4.0"
          ></img>
        </a>
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
                <div style={{ display: 'flex' }}>
                  <img src={getRealPath('/assets/facebook-logo-white.png')} />
                  <a
                    href={footer.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      style={{ marginLeft: '10px', textDecoration: 'none' }}
                    >
                      /{parseUsername(footer.socials.facebook)}
                    </span>
                  </a>
                </div>
              )}
              {footer && footer.socials && footer.socials.twitter && (
                <div style={{ display: 'flex' }}>
                  <img src={getRealPath('/assets/twitter-icon-18-256.png')} />
                  <a
                    href={footer.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      style={{ marginLeft: '10px', textDecoration: 'none' }}
                    >
                      @{parseUsername(footer.socials.twitter)}
                    </span>
                  </a>
                </div>
              )}
              {footer && footer.socials && footer.socials.mail && (
                <div style={{ display: 'flex' }}>
                  <img src={getRealPath('/assets/email.png')} />
                  <span style={{ marginLeft: '10px' }}>
                    {footer.socials.mail}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
