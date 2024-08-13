import { BaseTreeView } from '../../BaseTreeView';
import { RatioResult } from '../../../../Models/Results/RatioResults';
import { FC } from 'react';
import { RatioResultsTreeViewItem } from './RatioResultsTreeViewItem';
import { BoxView } from '../../../Views/BoxView';

type RatioResultsTreeViewProps = {
  title: string;
  results: RatioResult[];
};

export const RatioResultsTreeView: FC<RatioResultsTreeViewProps> = (props) => {
  const { title, results } = props;

  return (
    <BoxView title={title}>
      <BaseTreeView sx={{ mt: 2 }}>
        {results.map((result) => (
          <RatioResultsTreeViewItem key={result.id} result={result} />
        ))}
      </BaseTreeView>
    </BoxView>
  );
};
