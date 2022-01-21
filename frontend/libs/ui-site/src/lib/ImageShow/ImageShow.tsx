import classnames from "classnames";
import React from "react";
import { TextShow } from "../TextShow";
import styles from "./ImageShow.module.css";
interface ImageShowProps {
  caption?: string;
  title?: string;
  subtitle?: string;
  image: string;
  imageTitle?: string;
  isWide?: boolean;
  description?: string;
}
export const ImageShow = (props: ImageShowProps) => {
  const {
    description,
    caption,
    title,
    subtitle,
    image,
    isWide,
    imageTitle,
  } = props;
  return (
    <div className={styles.container}>
      {title && (
        <div className={classnames(styles.container_child, styles.title)}>
          {title}
        </div>
      )}
      {subtitle && (
        <div className={classnames(styles.container_child, styles.subtitle)}>
          {subtitle}
        </div>
      )}

      <div
        className={classnames(
          { [styles.container_child]: !isWide },
          styles.image_container
        )}
      >
        <img
          className={classnames(styles.image, { [styles.wide]: isWide })}
          src={image}
          alt={imageTitle}
        />
      </div>
      {caption && (
        <div className={classnames(styles.container_child, styles.caption)}>
          <TextShow text={caption} />
        </div>
      )}
      {description && (
        <div className={classnames(styles.container_child)}>
          <span>
            <TextShow text={description} />
          </span>
        </div>
      )}
    </div>
  );
};
