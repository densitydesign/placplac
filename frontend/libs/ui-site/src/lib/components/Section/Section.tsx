import classNames from 'classnames';
import React, { ComponentProps } from 'react';
import { SectionOuter } from '../SectionOuter';
import { SectionTitle } from '../SectionTitle';
import styles from './Section.module.css';

interface SectionProps extends ComponentProps<'div'> {
  small?: boolean;
  children: React.ReactNode;
  title?: string;
  contentAlign?: 'start' | 'title';
  marginFix?: boolean;
}
export const Section = (props: SectionProps) => {
  const {
    small = false,
    children,
    title,
    contentAlign = 'start',
    className,
    marginFix,
    ...rest
  } = props;
  return (
    <SectionOuter {...rest}>
      <div className={classNames({ [styles.small]: small }, styles.main)}>
        {title && <SectionTitle title={title} />}
        <div
          className={classNames(
            {
              [styles.content_align_title]: contentAlign === 'title',
            },
            styles.content,
            className
          )}
        >
          <div className={classNames({ [styles.margin_fix]: marginFix })}>
            {children}
          </div>
        </div>
      </div>
    </SectionOuter>
  );
};
