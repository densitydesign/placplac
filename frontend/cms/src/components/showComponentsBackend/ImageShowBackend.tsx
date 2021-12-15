import { useGetOne } from "ra-core";
import React from "react";
import { ImageShow } from "frontend-components";

interface ImageShowBackendProps {
  caption?: string;
  title?: string;
  subtitle?: string;
  image: number;
  isWide?: boolean;
  description?: string;
}
export const ImageShowBackend = (props: ImageShowBackendProps) => {
  const { caption, title, subtitle, image, isWide, description } = props;
  const { data } = useGetOne("project-media", image);
  return data ? (
    <ImageShow
      caption={caption}
      title={title}
      subtitle={subtitle}
      description={description}
      isWide={isWide}
      image={data.file}
      imageTitle={data.description}
    />
  ) : null;
};
