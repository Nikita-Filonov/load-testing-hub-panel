import { ResultCompareLabel } from '../ResultCompareLabel';
import { BaseLabelsView } from '../../BaseLabelsView';
import { MethodResultProtocolLabel } from './MethodResultProtocolLabel';
import { MethodResultDetails } from '../../../../Models/Results/MethodResults';
import { FC } from 'react';

type Props = {
  details: MethodResultDetails;
};

export const MethodResultDetailsLabelsView: FC<Props> = ({ details }) => {
  return (
    <BaseLabelsView listItemSx={(index) => ({ ml: index === 0 ? 0 : 0.5 })} containerSx={{ ml: 0 }}>
      <MethodResultProtocolLabel />
      {details.compare && <ResultCompareLabel compare={details.compare.compareWithAverage} context={'average'} />}
      {details.compare && <ResultCompareLabel compare={details.compare.compareWithPrevious} context={'previous'} />}
    </BaseLabelsView>
  );
};
