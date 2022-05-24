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

      <div className={styles.details}>
        {footer && footer.founded_by && (
          <>
            <span className={styles.section_title}>
              {translations[language].foundedby_footer}:
            </span>
            <div className={styles.image_list}>
              {footer.founded_by.map((founder, index) => (
                <a key={index} href={founder.link}>
                  <img src={getRealPath(founder.image)} />
                </a>
              ))}
            </div>
          </>
        )}
        {footer && footer.partners && (
          <>
            <span className={styles.section_title}>
              {translations[language].partners_footer}:
            </span>
            <div className={styles.image_list}>
              {footer.partners.map((founder, index) => (
                <a key={index} href={founder.link}>
                  <img src={getRealPath(founder.image)} />
                </a>
              ))}
            </div>
          </>
        )}
        {footer &&
          footer.socials &&
          (footer.socials.facebook ||
            footer.socials.mail ||
            footer.socials.twitter) && (
            <>
              <span className={styles.section_title}>
                {translations[language].contacts_footer}:
              </span>
              <div className={styles.contacts}>
                {footer.socials.facebook && (
                  <div className={styles.contact_item}>
                    <img src={getRealPath('/assets/facebook-logo-white.svg')} />
                    <a
                      href={footer.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>/{parseUsername(footer.socials.facebook)}</span>
                    </a>
                  </div>
                )}
                {footer.socials.twitter && (
                  <div className={styles.contact_item}>
                    <img src={getRealPath('/assets/twitter-icon-18-256.svg')} />
                    <a
                      href={footer.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>@{parseUsername(footer.socials.twitter)}</span>
                    </a>
                  </div>
                )}
                {footer.socials.mail && (
                  <div className={styles.contact_item}>
                    <img src={getRealPath('/assets/email.svg')} />
                    <a rel="noreferrer" href={`mailto:${footer.socials.mail}`}>
                      <span>{footer.socials.mail}</span>
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
};
