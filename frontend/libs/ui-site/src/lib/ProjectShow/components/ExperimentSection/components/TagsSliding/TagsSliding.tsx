import React, { Fragment, useEffect, useRef } from "react";
import styles from "./TagsSliding.module.css";

interface TagsSlidingProps {
  strings: string[];
}

export const TagsSliding = (props: TagsSlidingProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inner.current && wrapper.current) {
      const el = inner.current;
      let html = el.innerHTML;
      let counter = 0; // prevents infinite loop

      while (
        el.offsetWidth / 2 < wrapper.current.offsetWidth &&
        counter < 100
      ) {
        el.innerHTML += html;
        counter += 1;
      }
    }
  }, [props.strings]);

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <div ref={inner} className={styles.marquee}>
        {props.strings.map((text, index) => {
          return (
            <Fragment key={index}>
              <span>{text}</span>
              <span>◊</span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
