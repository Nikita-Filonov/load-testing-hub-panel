import { RatioResult } from '../../../../Models/Results/RatioResults';
import { FC } from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

type RatioResultsTreeViewItemProps = {
  result: RatioResult;
};

export const RatioResultsTreeViewItem: FC<RatioResultsTreeViewItemProps> = (props) => {
  const { result } = props;

  return (
    <TreeItem itemId={result.id} label={`${result.ratio * 100}% ${result.name}`}>
      {result.tasks.map((task) => (
        <RatioResultsTreeViewItem key={task.id} result={task} />
      ))}
    </TreeItem>
  );
};
