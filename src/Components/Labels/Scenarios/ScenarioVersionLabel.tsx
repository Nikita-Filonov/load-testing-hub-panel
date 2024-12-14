import { BaseLabel } from '../BaseLabel';
import { FC } from 'react';

type ScenarioVersionLabelProps = {
  version: string;
};

export const ScenarioVersionLabel: FC<ScenarioVersionLabelProps> = ({ version }) => {
  return <BaseLabel sx={{ ml: 1 }} color={'info'} label={version} />;
};
