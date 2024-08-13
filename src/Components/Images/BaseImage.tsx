import { CSSProperties, FC } from 'react';

type BaseImageProps = {
  src: string;
  style?: CSSProperties;
  width: number;
  height: number;
};

export const BaseImage: FC<BaseImageProps> = ({ src, style, width, height }) => {
  return <img src={src} alt={src} style={{ width, height, ...style }} />;
};
