import { createRef, useEffect, useRef, useState } from 'react';
import p5 from 'p5';
interface ImagesAnimatedProps {
  imagesUrls: string[];
  width: number;
  height: number;
}
const perlinIncrement = 0.001;
let k = 1;
let images: any[] = [];

export const ImagesAnimated: React.FC<ImagesAnimatedProps> = (props) => {
  const { width, height, imagesUrls } = props;
  const ref = useRef<HTMLDivElement>(null);
  const refP5 = useRef<p5>();
  useEffect(() => {
    const sketch = (p5: p5) => {
      p5.setup = () => {
        p5.createCanvas(width, height);
        p5.imageMode(p5.CENTER);
        images.forEach((img) => {
          img.perlinOffsetX = p5.round(p5.random(images.length * 1000));
          img.perlinOffsetY = p5.round(p5.random(images.length * 1000));
        });
        const maxSize = p5.max(width, height) / 8;
        k =
          maxSize /
          p5.max(
            p5.max(images.map((d) => d.width)),
            p5.max(images.map((d) => d.height))
          );
      };

      p5.draw = () => {
        p5.clear(0, 0, 0, 0); //@ts-ignore;
        images.forEach((img) => {
          img.perlinOffsetX += perlinIncrement;
          img.perlinOffsetY += perlinIncrement;
          const pos_x = p5.noise(img.perlinOffsetX) * width;
          const pos_y = p5.noise(img.perlinOffsetY) * height;
          p5.image(img, pos_x, pos_y, img.width * k, img.height * k);
        });
      };

      p5.preload = () => {
        images = imagesUrls.map((url) => p5.loadImage(url));
      };
    };
    if (ref.current) {
      refP5.current = new p5(sketch, ref.current);
    }
    return () => {
      if (refP5.current) {
        refP5.current.remove();
      }
    };
  }, []);

  return <div ref={ref} />;
};
