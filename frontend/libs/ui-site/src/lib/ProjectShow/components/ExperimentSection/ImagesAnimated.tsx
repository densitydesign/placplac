import Sketch from 'react-p5';
import p5Types from 'p5';
import { useState } from 'react';
interface ImagesAnimatedProps {
  imagesUrls: string[];
  width: number;
  height: number;
}

const perlinIncrement = 0.001;
let k = 1;

export const ImagesAnimated: React.FC<ImagesAnimatedProps> = (props) => {
  const { width, height, imagesUrls } = props;
  const [images, setImages] = useState<any[]>([] as any);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
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

  const draw = (p5: p5Types) => {
    p5.clear();
    images.forEach((img) => {
      img.perlinOffsetX += perlinIncrement;
      img.perlinOffsetY += perlinIncrement;
      const pos_x = p5.noise(img.perlinOffsetX) * width;
      const pos_y = p5.noise(img.perlinOffsetY) * height;
      p5.image(img, pos_x, pos_y, img.width * k, img.height * k);
    });
  };

  const preload = (p5: p5Types) => {
    setImages(imagesUrls.map((url) => p5.loadImage(url)));
  };

  return <Sketch setup={setup} draw={draw} preload={preload} />;
};
