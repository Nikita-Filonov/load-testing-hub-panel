import { BaseLabelsView } from '../BaseLabelsView';
import { ServiceNumberOfScenariosLabel } from './ServiceNumberOfScenariosLabel';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { ServiceNumberOfLoadTestResultsLabel } from './ServiceNumberOfLoadTestResultsLabel';

type Props = {
  service: Service;
};

export const ServiceListItemLabelsView: FC<Props> = ({ service }) => {
  return (
    <BaseLabelsView>
      <ServiceNumberOfScenariosLabel service={service} />
      <ServiceNumberOfLoadTestResultsLabel service={service} />
    </BaseLabelsView>
  );
};
