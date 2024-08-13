import { SettingsManager } from '../../Services/Config';
import React, { FC } from 'react';
import { BaseImage } from './BaseImage';

type LogoImageProps = {
  width: number;
  height: number;
};

export const LogoImage: FC<LogoImageProps> = ({ width, height }) => {
  return <BaseImage src={SettingsManager.getStaticFileUrl('logo.png')} width={width} height={height} />;
};
