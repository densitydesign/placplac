import React, { useEffect, useRef } from 'react';
import styles from './BackToTopButton.module.css';
export const BackToTopButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleVisibleButton = () => {
      const position = window.pageYOffset;

      if (position > 400) {
        if (ref.current) ref.current.classList.add(styles.show);
      } else if (position <= 400) {
        if (ref.current) ref.current.classList.remove(styles.show);
      }
    };

    window.addEventListener('scroll', handleVisibleButton);
    return () => window.removeEventListener('scroll', handleVisibleButton);
  });
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={onClick}
      title="Go top"
    ></button>
  );
};
